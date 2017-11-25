# SharePoint Framework Tic-Tac-Toe WebPart

[![SharePoint Framework - Tic-Tac-Toe](/Images/SP.png?raw=true "SharePoint Framework - Tic-Tac-Toe" )](http://www.sharepointwidgets.com)

Hi Friends,

Now enjoy with work. Play tic-tac-toe and give you mind a bit relaxing so you can energize yourself for the tough job you do in office whole day.

This webpart is created just for fun so whenever you feel exhausted , relax youself and enjoy.

![SharePoint Framework Tic-Tac-Toe Webpart](/Images/Game-SharePointFrameworkTicTacToe.png?raw=true "http://www.sharepointwidgets.com")

## WebPart Features!!
  - Game Stats - Keeps the record of total games played, your won and computer won
  - Even if you need to navigate from the page, don't worry you'll never loose your scores
  - Don't underestimate your opponent
  - Fully responsive, so no matter on which device you play  - 
 
![SharePoint Framework Tic-Tac-Toe Webpart](/Images/StartGame-SharePointFrameworkTicTacToe.png?raw=true "http://www.sharepointwidgets.com")
 
![SharePoint Framework Tic-Tac-Toe Webpart](/Images/Game-SharePointFrameworkTicTacToe.png?raw=true "http://www.sharepointwidgets.com")

![SharePoint Framework Tic-Tac-Toe Webpart](/Images/PlayAgain-SharePointFrameworkTicTacToe.png?raw=true "http://www.sharepointwidgets.com")

### Configuration ?
  - So there are no configuration.
  - It's simple just deploy the webpart to your tenant and done.

## Deployment

For deployment follow the below steps
  - Clone the repository
  - Open the code in Visual Code or in any other IDE
  - Change the 'cdnBasePath' url inside the Config/write-manifest.json
  - Create the package
    - Run the following commands
    ```sh
    gulp
    gulp serve --nobrowser
    gulp package-solution --ship
    ```
    - Now upload the weather.sppkg file from sharepoint/solution folder
    - Upload the files inside temp/deploy to the cdnBasePath url
- Now add the webpart to the page
 

Happy Coding  

Sumit Kanchan
