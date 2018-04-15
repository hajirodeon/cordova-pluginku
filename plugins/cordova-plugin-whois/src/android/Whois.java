
package org.tiste.cordova.whois;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

import org.apache.commons.net.whois.WhoisClient;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaInterface;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class Whois extends CordovaPlugin {
  public static final String TAG = "Whois";

  @Override
  public void initialize(CordovaInterface cordova, CordovaWebView webView) {
    super.initialize(cordova, webView);
  }

  @Override
  public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    if ("getWhoisInfo".equals(action)) {
      this.whois(args, callbackContext);
      return true;
    }
    return false;
  }

  private void whois(JSONArray args, CallbackContext callbackContext) {
    try {
      if (args != null && args.length() > 0) {
        JSONArray resultList = new JSONArray();
        int length = args.length();
        for (int index = 0; index < length; index++) {
          String ip = args.getString(index);
          String[] ipArray = new String[] {ip};
          String result = doWhois(ipArray);
          JSONObject r = new JSONObject();
          r.put("query", ip);
          if (result.length() > 0) {
            r.put("status", "success");
            r.put("result", result);
            resultList.put(r);
            System.out.println("success \n");
          } else {
            r.put("status", "timeout");
            r.put("result", 0);
            resultList.put(r);
            System.out.println("timeout \n");
          }
        }
        callbackContext.success(resultList);
      } else {
        callbackContext.error("Error occurred");
      }
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
  }

  private String doWhois(String[] args) {
    int index;
    String handle, host, result;
    InetAddress address = null;
    WhoisClient whoisClient;

    if (args.length != 1) {
      System.err.println("usage: fwhois handle[@<server>]");
      return "";
    }

    index = args[0].lastIndexOf("@");

    whoisClient = new WhoisClient();
    whoisClient.setDefaultTimeout(5000);

    if (index == -1) {
      handle = args[0];
      host = WhoisClient.DEFAULT_HOST;
    } else {
      handle = args[0].substring(0, index);
      host = args[0].substring(index + 1);
    }

    try {
      address = InetAddress.getByName(host);
      System.out.println("[" + address.getHostName() + "]");
    } catch (UnknownHostException e) {
      System.err.println("Error unknown host: " + e.getMessage());
      return "";
    }

    try {
      whoisClient.connect(address);
      result = whoisClient.query(handle);
      System.out.print(result);
      whoisClient.disconnect();
    } catch (IOException e) {
      System.err.println("Error I/O exception: " + e.getMessage());
      return "";
    }
    return result;
  }
}
