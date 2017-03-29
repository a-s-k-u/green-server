dim fso: set fso = CreateObject("Scripting.FileSystemObject")
dim CurrentDirectory
CurrentDirectory = fso.GetAbsolutePathName(".")
dim globalScriptFile
globalScriptFile = fso.BuildPath(CurrentDirectory, "createLocalServer.ps1")
dim projectFolder
projectFolder = fso.BuildPath(CurrentDirectory, "Offwired")
Set objShell = CreateObject("Wscript.Shell")
strExpression = globalScriptFile & " " & projectFolder
strCMD="powershell -sta -noProfile -NonInteractive  -nologo -command " & Chr(34) &_
"&{" & strExpression &"}" & Chr(34) 
objShell.Run strCMD,0