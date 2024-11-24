:: You need a file in the same folder as this bat named "Subject" that has a blank in it
_Echo off
set blank=bla
for /L %%i in (2510 1 2539) do copy "Subject.txt" "Subject%%i.txt"

:: You need to change the permissions of the Subject%%i.txt files to 0777 or -rwxrwxrwx after uploading to the server