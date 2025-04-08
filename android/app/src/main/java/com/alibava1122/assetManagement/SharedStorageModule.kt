package com.alibava1122.assetManagement

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SharedStorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val sharedPreferences: SharedPreferences = reactContext.getSharedPreferences("WidgetData", Context.MODE_PRIVATE)

    override fun getName(): String {
        return "SharedStorage"
    }

    @ReactMethod
    fun saveData(key: String, value: String) {
        sharedPreferences.edit().putString(key, value).apply()
    }

    @ReactMethod
    fun getData(key: String, callback: com.facebook.react.bridge.Callback) {
        val value = sharedPreferences.getString(key, "")
        callback.invoke(value)
    }
}

