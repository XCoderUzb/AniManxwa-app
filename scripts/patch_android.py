# Android loyihasiga: 1) animanxwa:// havolalari, 2) skrinshotni taqiqlash, 3) ikonka, 4) qora ishga tushish fonu
import re, glob, os, zipfile
m = 'android/app/src/main/AndroidManifest.xml'
s = open(m, encoding='utf-8').read()
f = '''<intent-filter>
  <action android:name="android.intent.action.VIEW"/>
  <category android:name="android.intent.category.DEFAULT"/>
  <category android:name="android.intent.category.BROWSABLE"/>
  <data android:scheme="animanxwa"/>
</intent-filter>
'''
open(m, 'w', encoding='utf-8').write(s.replace('</activity>', f + '</activity>', 1))
j = glob.glob('android/app/src/main/java/**/MainActivity.java', recursive=True)[0]
t = open(j, encoding='utf-8').read()
t = re.sub(r'public class MainActivity extends BridgeActivity\s*\{\s*\}',
  'public class MainActivity extends BridgeActivity {\n  @Override public void onCreate(android.os.Bundle b){ super.onCreate(b); getWindow().setFlags(8192, 8192); }\n}', t)
open(j, 'w', encoding='utf-8').write(t)
res = 'android/app/src/main/res'
for z in ('icons.zip', 'scripts/icons.zip'):
    if os.path.exists(z):
        zipfile.ZipFile(z).extractall(res); break
for p in glob.glob(res + '/drawable*/splash.png'): os.remove(p)
os.makedirs(res + '/drawable', exist_ok=True)
open(res + '/drawable/splash.xml', 'w').write('<?xml version="1.0" encoding="utf-8"?><shape xmlns:android="http://schemas.android.com/apk/res/android"><solid android:color="#000000"/></shape>')
