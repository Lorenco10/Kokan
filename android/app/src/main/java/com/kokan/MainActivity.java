package com.kokan;

import android.app.Activity;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

        @Override
    protected void onCreate(Bundle savedInstanceState) {
      hide();
      super.onCreate(savedInstanceState);
    }
    @Override
    public void onResume(){
    super.onResume();
    hide();

    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Kokan";
    }

    public void hide() {
    // Enables regular immersive mode.
    // For "lean back" mode, remove SYSTEM_UI_FLAG_IMMERSIVE.
    // Or for "sticky immersive," replace it with SYSTEM_UI_FLAG_IMMERSIVE
       final  Activity reactActivity = this;
        UiThreadUtil.runOnUiThread(new Runnable() { 
            @Override public void run() {
                 if(reactActivity != null) {
                    View decorView = reactActivity.getWindow().getDecorView();
                    decorView.setSystemUiVisibility(
                        View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                        // Set the content to appear under the system bars so that the
                        // content doesn't resize when the system bars hide and show.
                        | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                        // Hide the nav bar and status bar
                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                        | View.SYSTEM_UI_FLAG_FULLSCREEN);
                 }
             }
         });
    }  
}
