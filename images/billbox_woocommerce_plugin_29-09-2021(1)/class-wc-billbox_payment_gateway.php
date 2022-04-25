<?php
/**
 * WC Billbox Gateway Class.
 * Built the billbox method.
 */
class WC_Billbox_Payment_Gateway extends WC_Payment_Gateway {

    /**
     * Constructor for the gateway.
     *
     * @return void
     */
    public function __construct() {
        global $woocommerce;

        $this->id             = 'billbox';
        //$this->icon           = apply_filters( 'woocommerce_billbox_icon', 'http://www.doerslab.com/billbox/images/badges/pay_with_billbox.png' );
        $this->has_fields     = false;
        $this->method_title   = __( 'Billbox', 'billbox' );

		$this->payUri = 'https://posapi.usebillbox.com/webpos/createInvoice';
		$this->checkPaymentStatus = 'https://posapi.usebillbox.com/webpos/checkPaymentStatus';

		$this->SvcType = 'C2B';

        // Load the form fields.
        $this->init_form_fields();

        // Load the settings.
        $this->init_settings();

        // Define user set variables.
        $this->title          = $this->settings['title'];
        $this->description    = $this->settings['description'];

        $this->version          = $this->settings['version'];
        $this->app_id          = $this->settings['app_id'];
        $this->app_reference          = $this->settings['app_reference'];
        $this->app_secret          = $this->settings['app_secret'];
        $this->callback_url          = $this->settings['callback_url'];

		$this->instructions       = $this->get_option( 'instructions' );
		$this->enable_for_methods = $this->get_option( 'enable_for_methods', array() );

        // Actions.
        if ( version_compare( WOOCOMMERCE_VERSION, '2.0.0', '>=' ) )
            add_action( 'woocommerce_update_options_payment_gateways_' . $this->id, array( &$this, 'process_admin_options' ) );
        else
            add_action( 'woocommerce_update_options_payment_gateways', array( &$this, 'process_admin_options' ) );


		add_action( 'woocommerce_api_wc_billbox_payment_gateway', array( $this, 'callback_response' ) );


    }

	public function get_icon() {
		$icon = 'https://s3.eu-west-1.amazonaws.com/public.uat.usebillbox.com/static/images/billbox_normal.png';
		$icon_html = '<img src="' . esc_attr( apply_filters( 'woocommerce_billbox_icon', $icon ) ) . '" alt="Billbox Acceptance Badge" />';

		$link = 'https://dreamoval.com/';
		$what_is_billbox = sprintf( '<a href="%1$s" style="float: right;font-size: 0.83em;line-height: 52px;" onclick="javascript:window.open(\'%1$s\',\'WIBillbox\',\'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700\'); return false;" title="' . esc_attr__( 'What is Billbox?', 'woocommerce' ) . '">' . esc_attr__( 'What is Billbox?', 'woocommerce' ) . '</a>', esc_url( $link ) );

		return apply_filters( 'woocommerce_gateway_icon', $icon_html . $what_is_billbox, $this->id );
	}

	private function getOrderParams($order){
		// Products
		$products = array();
		if ( sizeof( $order->get_items() ) > 0 ) {
			foreach ( $order->get_items() as $item ) {
				if ( ! $item['qty'] ) {
					continue;
				}
				$item_loop ++;
				$product   = $order->get_product_from_item( $item );
				$item_name = $item['name'];
				$item_image = wp_get_attachment_url( $product->get_image_id() );

				$products[] = array (
                                  'code' => $product->get_sku(),
                                  'name' => $item_name,
                                  'description' => $item_name,
                                  'imgUrl' => $item_image,
                                  'unitPrice' => $product->get_price(),
                                  'quantity' => $item->get_quantity(),
                                  'subTotal' => $item->get_subtotal(),
                                );




			}
		}
/*
		//billbox vars to send
		$params = array();
		$params['orderId'] = $order->id;
		//$params['subtotal'] = number_format( $order->get_total() - round( $order->get_total_shipping() + $order->get_shipping_tax(), 2 ) + $order->get_order_discount(), 2, '.', '' );
		$params['subtotal'] = number_format( $order->get_total() - round( $order->get_total_shipping() + $order->get_shipping_tax(), 2 ) + $order->get_total_discount(), 2, '.', '' );
		$params['shippingCost'] = number_format( $order->get_total_shipping() + $order->get_shipping_tax(), 2, '.', '' );
		$params['taxAmount'] = $order->get_shipping_tax();
		$params['total'] = $order->get_total();
		$params['comment1'] = substr($comment, 0, -2);;
		$params['orderItems'] = array('OrderItem' => $products);
		//echo '<pre>';print_r($order);print_r($params);exit;
		return $params;
		*/

		return $products;
	}

    /* Admin Panel Options.*/
	function admin_options() {
		?>
		<h3><?php _e('Billbox','billbox'); ?></h3>
    	<table class="form-table">
    		<?php $this->generate_settings_html(); ?>
		</table> <?php
    }

    /* Initialise Gateway Settings Form Fields. */
    public function init_form_fields() {
    	global $woocommerce;

    	$shipping_methods = array();

    	if ( is_admin() )
	    	foreach ( $woocommerce->shipping->load_shipping_methods() as $method ) {
		    	$shipping_methods[ $method->id ] = $method->get_title();
	    	}

        $this->form_fields = array(
            'enabled' => array(
                'title' => __( 'Enable/Disable', 'billbox' ),
                'type' => 'checkbox',
                'label' => __( 'Enable Billbox', 'billbox' ),
                'default' => 'no'
            ),
            'title' => array(
                'title' => __( 'Title', 'Billbox' ),
                'type' => 'text',
                'description' => __( 'This controls the title which the user sees during checkout.', 'billbox' ),
                'desc_tip' => true,
                'label' => __( 'billbox', 'billbox' ),
                'default' => __( 'Billbox', 'billbox' )
            ),
            'description' => array(
                'title' => __( 'Description', 'billbox' ),
                'type' => 'textarea',
                'description' => __( 'This controls the description which the user sees during checkout.', 'billbox' ),
                'default' => __( 'Pay via Billbox; you can pay with your debit/credit card, bank account or mobile money if you don\'t have a Billbox account.', 'billbox' )
            ),
            'version' => array(
                'title' => __( 'API Version', 'billbox' ),
                'type' => 'text',
                'description' => __( 'Specify the API version from which you are integrating your application. For this API version specify (1.4).', 'billbox' ),
                'desc_tip' => true,
                'default' => __( '1.4', 'billbox' )
            ),
            'app_id' => array(
                'title' => __( 'APP ID', 'billbox' ),
                'type' => 'text',
                'description' => __( 'Check your App ID from the Devices Menu in your Billbox Account', 'billbox' ),
                'desc_tip' => true,
                'default' => ''
            ),            
            'app_reference' => array(
                'title' => __( 'APP Reference', 'billbox' ),
                'type' => 'text',
                'description' => __( 'Check your App Reference from the Devices Menu in your Billbox Account', 'billbox' ),
                'desc_tip' => true,
                'default' => ''
            ),
            'app_secret' => array(
                'title' => __( 'APP Secret', 'billbox' ),
                'type' => 'text',
                'description' => __( 'This is the same secret you set when setting up a Device in Billbox', 'billbox' ),
                'desc_tip' => true,
                'default' => ''
            ),
            'callback_url' => array(
                'title' => __( 'Callback URL', 'billbox' ),
                'type' => 'textarea',
                'description' => __( 'The is the url Billbox will post back to once transaction is complete.', 'billbox' ),
                'desc_tip' => true,
                'default' => __( WC()->api_request_url( 'WC_Billbox_Payment_Gateway' ), 'billbox' )
            ),

        );

    }




    /* Process the payment and return the result. */
	function process_payment ($order_id) {

		global $woocommerce;

		$order = new WC_Order( $order_id );
		$shipping_total = $order->get_shipping_total();
        $taxAmount   = $order->get_total_tax();
        $discount_total   = $order->get_discount_total();
        $fees   = $order->get_fees();

		$requestArr = array ('requestId' => (string)$order_id,
                              'appReference' => trim($this->app_reference),
                              'secret' => trim($this->app_secret),
                              'merchantOrderId' => (string)$order_id,
                              'currency' => 'GHS',
                              'shipping' => $shipping_total,
                              'taxAmount' => $taxAmount,
                              'discountAmount' => $discount_total,
                              'fees' => $fees,                              
                            );

        $requestArr['invoiceItems'] = $this->getOrderParams($order);
        //echo '<pre>asdf';print_r($requestArr);exit;

        $curl = curl_init();

        curl_setopt_array($curl, array(
          CURLOPT_URL => $this->payUri,
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_ENCODING => "",
          CURLOPT_MAXREDIRS => 10,
          CURLOPT_TIMEOUT => 0,
          CURLOPT_FOLLOWLOCATION => true,
          CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
          CURLOPT_CUSTOMREQUEST => "POST",
          CURLOPT_POSTFIELDS => json_encode($requestArr,JSON_UNESCAPED_SLASHES),
          CURLOPT_HTTPHEADER => array(
            "appId: ".$this->app_id,
            "Content-Type: application/json"
          ),
        ));

        $result = curl_exec($curl);
        curl_close($curl);
        $result = json_decode($result, true);
        //echo '<pre>asdf';print_r($result);exit;

		$resposnse = array();
		$resposnse['error'] = '';

		//echo '<pre>';print_r($result);print_r($resposnse);exit;
		//echo add_query_arg(array( 'pay_token' => $resposnse['pay_token'], 'order_id' => $this->oid ), $this->payUri);exit;
		if(isset($result['success']) && $result['success'] != ''){
			// Mark as on-hold
			//$order->update_status('on-hold', __( 'Your order wont be shipped until the funds have cleared in our account.', 'woocommerce' ));

			// Reduce stock levels
			//$order->reduce_order_stock();

			// Remove cart
			//$woocommerce->cart->empty_cart();

			// Return thankyou redirect
			return array(
				'result' 	=> 'success',
				'redirect'	=> $result['result']['checkoutUrl']
			);
		}else{
			$error_message = 'Something goes wrong. Please contact administrator.';
			if(isset($result['error'])){
				$error_message = $result['error'];
			} else if(isset($result['statusMessage'])  && $result['statusMessage'] != ''){
			    $error_message = $result['statusMessage'];
			}
			wc_add_notice( __( 'Billbox error: ', 'billbox' ) . $error_message, 'error' );
		}
	}

	public function callback_response() {
		@ob_clean();
		$status = isset($_GET['status']) ? $_GET['status'] : -1;
		$cust_ref = isset($_GET['cust_ref']) ? $_GET['cust_ref'] : '';
		$transac_id = isset($_GET['transac_id']) ? $_GET['transac_id'] : '';
		$pay_token = isset($_GET['pay_token']) ? $_GET['pay_token'] : '';
		$order = $order = wc_get_order( $cust_ref );
		if($status == 0){
			$params = array();
			$params['payToken'] = $pay_token;
			$params['transactionId'] = $transac_id;


			$params = array ('requestId' => (string)$order_id,
							  'appReference' => trim($this->app_reference),
							  'secret' => trim($this->app_secret),
							  'transactionId' => (string)$transac_id,
							);
			$curl = curl_init();

			curl_setopt_array($curl, array(
			  CURLOPT_URL => $this->checkPaymentStatus,
			  CURLOPT_RETURNTRANSFER => true,
			  CURLOPT_ENCODING => "",
			  CURLOPT_MAXREDIRS => 10,
			  CURLOPT_TIMEOUT => 0,
			  CURLOPT_FOLLOWLOCATION => true,
			  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			  CURLOPT_CUSTOMREQUEST => "POST",
			  CURLOPT_POSTFIELDS => json_encode($params,JSON_UNESCAPED_SLASHES),
			  CURLOPT_HTTPHEADER => array(
				"appId: ".$this->app_id,
				"Content-Type: application/json"
			  ),
			));

			$result = curl_exec($curl);
			curl_close($curl);
			$result = json_decode($result, true);
        //echo '<pre>asdf';print_r($result);exit;

			if(isset($result['success']) && $result['success']==1){ //Confirmation Successful
				$comment = "transac_id = ". $transac_id . "\n";
				$order->add_order_note( __( $comment, 'woocommerce' ) );
				$order->payment_complete( $transac_id );
				header('Location:'.$this->get_return_url( $order ));
				exit;
			}elseif(isset($result['success']) && $result['success']==0){ //Confirmation failed: Invalid transaction Id
				wp_die( "Confirmation failed: Invalid transaction Id", "Billbox", array( 'response' => 200 ) );
			}elseif(isset($result['success']) && $result['success']==-1){ //Confirmation Failed: Invalid pay token
				wp_die( "Confirmation Failed: Invalid pay token", "Billbox", array( 'response' => 200 ) );
			}else{
				return array(
					'result' 	=> 'success',
					'redirect'	=> home_url()
				);
				header('Location:'.home_url());
				exit;
			}
		}elseif($status==-1){ // Technical error contact
			wp_die( "Technical error contact", "Billbox", array( 'response' => 200 ) );
		}elseif($status==-2){ // User cancelled transaction
				header('Location:'.home_url());
				exit;
		}


	}


    /* Output for the order received page.   */
	function thankyou() {
		echo $this->instructions != '' ? wpautop( $this->instructions ) : '';
	}



}
