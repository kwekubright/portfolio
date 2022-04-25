<?php
/*
Plugin Name: Billbox WooCommerce Plugin
Plugin URI: http://app.slydepay.com.gh/
Description: Billbox Payment Gateway for WooCommerce.
Version: 1.0.0
Author: DreamOval Ltd.
Author URI: http://www.dreamoval.com/
License: GPLv1
*/

/* WooCommerce fallback notice. */
function woocommerce_cpg_fallback_notice() {
    echo '<div class="error"><p>' . sprintf( __( 'Billbox Plugin for WooCommerce depends on the last version of %s to work!', 'wcCpg' ), '<a href="http://wordpress.org/extend/plugins/woocommerce/">WooCommerce</a>' ) . '</p></div>';
}

/* Load functions. */
function custom_payment_gateway_load() {
    if ( ! class_exists( 'WC_Payment_Gateway' ) ) {
        add_action( 'admin_notices', 'woocommerce_cpg_fallback_notice' );
        return;
    }
   
    function wc_Custom_add_gateway( $methods ) {
        $methods[] = 'WC_Billbox_Payment_Gateway';
        return $methods;
    }
	add_filter( 'woocommerce_payment_gateways', 'wc_Custom_add_gateway' );
	
	
    // Include the WooCommerce Custom Payment Gateways classes.
    require_once plugin_dir_path( __FILE__ ) . 'class-wc-billbox_payment_gateway.php';

}

add_action( 'plugins_loaded', 'custom_payment_gateway_load', 0 );



/* Adds custom settings url in plugins page. */
function wcCpg_action_links( $links ) {
    return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'wcCpg_action_links' );


?>