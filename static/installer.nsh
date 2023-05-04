!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "Promethium" "Software\Clients\StartMenuInternet\Promethium\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\Promethium" "" "Promethium HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\Promethium\Application" "AppUserModelId" "Promethium"
  WriteRegStr SHCTX "SOFTWARE\Classes\Promethium\Application" "ApplicationIcon" "$INSTDIR\Promethium.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Promethium\Application" "ApplicationName" "Promethium"
  WriteRegStr SHCTX "SOFTWARE\Classes\Promethium\Application" "ApplicationCompany" "Promethium"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Promethium\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\Promethium\DefaultIcon" "DefaultIcon" "$INSTDIR\Promethium.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\Promethium\shell\open\command" "" '"$INSTDIR\Promethium.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "Promethium" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "Promethium" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium" "" "Promethium"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\DefaultIcon" "" "$INSTDIR\Promethium.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\Capabilities" "ApplicationName" "Promethium"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\Capabilities" "ApplicationIcon" "$INSTDIR\Promethium.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\Capabilities\FileAssociations" ".htm" "Promethium"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\Capabilities\FileAssociations" ".html" "Promethium"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\Capabilities\URLAssociations" "http" "Promethium"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\Capabilities\URLAssociations" "https" "Promethium"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\Capabilities\StartMenu" "StartMenuInternet" "Promethium"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium\shell\open\command" "" "$INSTDIR\Promethium.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\Promethium"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\Promethium"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "Promethium"
!macroend
