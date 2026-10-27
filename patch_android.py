# Android loyihasiga: 1) animanxwa://manhwa havolasi, 2) skrinshot/yozib olishni taqiqlash (FLAG_SECURE)
import re, glob
m = 'android/app/src/main/AndroidManifest.xml'
s = open(m, encoding='utf-8').read()
f = '''<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="animanxwa" android:host="manhwa"/>
</intent-filter>
'''
open(m, 'w', encoding='utf-8').write(s.replace('</activity>', f + '</activity>', 1))
j = glob.glob('android/app/src/main/java/**/MainActivity.java', recursive=True)[0]
t = open(j, encoding='utf-8').read()
t = re.sub(r'public class MainActivity extends BridgeActivity\s*\{\s*\}',
  'public class MainActivity extends BridgeActivity {\n  @Override public void onCreate(android.os.Bundle b){ super.onCreate(b); getWindow().setFlags(8192, 8192); }\n}', t)
open(j, 'w', encoding='utf-8').write(t)
