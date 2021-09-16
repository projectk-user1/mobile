# mobile

ionic android build steps
Step1
C:\ProjectK\code\Ionic\projectK>ionic cordova build --release android
BUILD SUCCESSFUL in 51s
42 actionable tasks: 5 executed, 37 up-to-date
Built the following apk(s):
        C:\ProjectK\code\Ionic\projectK\platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
		
Step 2 - Access as Administrator
C:\Program Files\Java\jdk1.8.0_171\bin>jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk ProjectK
passphrase projectK
Step 3
C:\Users\xxxxx\AppData\Local\Android\Sdk\build-tools\29.0.2>zipalign -v 4 app-release-unsigned.apk ProjectK.apk


