package com.yoda;

import android.content.Intent;
import android.graphics.Point;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.webkit.WebView;

public class SplashActivity extends AppCompatActivity {
    private final int delayTime = 1890;
    private Handler handler = new Handler();
    private Runnable runnable = new Runnable() {
        @Override
        public void run() {
            Intent intent = new Intent(SplashActivity.this, MainActivity.class);
            startActivity(intent);

            finish();
            overridePendingTransition(android.R.anim.fade_in, android.R.anim.fade_out);
        }
    };

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        webView = (WebView) findViewById(R.id.webview);
        webView.loadUrl("file:///android_asset/splash_gif_1128.gif");
        webView.setVerticalScrollBarEnabled(false);
        webView.setHorizontalScrollBarEnabled(false);


        Display display = this.getWindowManager().getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);

        webView.setInitialScale((size.x * 100) / 782);


        handler.postDelayed(runnable, delayTime);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        handler.removeCallbacks(runnable);
    }
}
