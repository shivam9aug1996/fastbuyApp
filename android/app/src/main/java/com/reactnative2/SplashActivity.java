package com.reactnative2;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;

public class SplashActivity extends AppCompatActivity {

    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     super.onCreate(savedInstanceState);
    //     setContentView(R.layout.activity_splash);
    //     new Handler().postDelayed(new Runnable() {
    //         @Override
    //         public void run() {
    //             // Start the main activity and finish the splash activity
    //             Intent intent = new Intent(SplashActivity.this, MainActivity.class);
    //             startActivity(intent);
    //             finish();
    //         }
    //     }, 2000);
    // }
    


    private boolean isAppReady = false; // Set this to true when the app is ready

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        // Check if the app is ready and the layout is loaded
        if (isAppReady && isLayoutLoaded()) {
            hideSplashScreen();
        } else {
            // Delayed hide using a handler (adjust the delay as needed)
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    // Start the main activity and finish the splash activity
                    Intent intent = new Intent(SplashActivity.this, MainActivity.class);
                    startActivity(intent);
                    finish();
                }
            }, 2000); // Delay in milliseconds
        }
    }

    // Check if the layout is loaded (example: check if the root view is not null)
    private boolean isLayoutLoaded() {
        View rootView = findViewById(android.R.id.content);
        return rootView != null;
    }

    // Hide the splash screen
    private void hideSplashScreen() {
        findViewById(R.id.splashLayout).setVisibility(View.GONE);
    }

   
}