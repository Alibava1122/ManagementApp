package com.alibava1122.assetManagement

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews

class MyWidgetProvider : AppWidgetProvider() {
    override fun onUpdate(
        context: Context?,
        appWidgetManager: AppWidgetManager?,
        appWidgetIds: IntArray?
    ) {
        if (context == null || appWidgetManager == null || appWidgetIds == null) return

        for (appWidgetId in appWidgetIds) {
            updateWidget(context, appWidgetManager, appWidgetId)
        }
    }

    companion object {
        fun updateWidget(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int) {
            val views = RemoteViews(context.packageName, R.layout.widget_layout)

            // Set Widget Data
            views.setTextViewText(R.id.widgetTitle, "Kittens Journey")
            views.setTextViewText(R.id.widgetSubtitle, "Widget Example")
            views.setTextViewText(R.id.widgetAmount, "$1000")

            // Set Image
            views.setImageViewResource(R.id.widgetImage, R.mipmap.ic_launcher)

            // Set Click Action (Optional)
            val intent = Intent(context, MainActivity::class.java)
            val pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT)
            views.setOnClickPendingIntent(R.id.tileContainer, pendingIntent)

            // Update the widget
            appWidgetManager.updateAppWidget(appWidgetId, views)
        }
    }
}
