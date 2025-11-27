## Dancing With The Stars (Season 34) 

### General App Description 
My app is a reflection of my hyperfixation on Dancing with the Stars Season 34. It features a navigation bar with four pages: Home, Finale Voting, Previous Weeks, and Star Stats.

 - Home Page: The home page displays cards for each star and their partner, including their names and a photo. At the bottom of the page, there is a countdown to the next episode (Tuesday at 5pm).

- Finale Voting: The finale voting page presents cards for the four finalists, each with a button to cast votes. Users can submit up to 10 votes per couple. When the submit button is pressed, the votes are sent to the backend, which updates an ongoing tally. A modal then appears, showing the current total votes across all sessions for each finalist.

- Previous Weeks: The Previous Weeks page lets users explore how each couple performed throughout the season. At the top, buttons allow selection of any week (Week 1–10). When a week is selected, the page displays cards for each star, showing their dance style, score, and song. Clicking a card opens a modal with a YouTube video of that week's performance. Cards highlighted in red indicate that the star was eliminated that week.

- Star Stats: The Star Stats page provides visual insights into each star’s performance and comparisons between them. The first chart displays the total votes each star received, ranked from highest to lowest. Below the chart, a dropdown allows users to select two stars to compare. Clicking the "Compare Contestants" button opens a modal showing a two-bar graph of the stars’ average scores for each week. Finally, there is a pie chart that will illustrate how often the lowest scoring star was sent home. 

### External Libraries 
For my Star Stats page, I used the Recharts API, which generates a variety of graphs from data. To use this API, I installed it via npm and then imported the necessary components, making it straightforward to integrate with React. I chose this API specifically because it offers a large number of examples on its website, which made learning and implementing it much easier. Additionally, the library is designed to work with React, simplifying integration with my existing code.

For my countdown to Season 35, I used the World Time API, which returns a JSON object containing the UTC datetime, day of the week, day of the year, and more. This made it easy to extract the information I needed and perform the calculations to generate an accurate countdown.

Finally, I used React Bootstrap for my modals and error messages. Using this package allowed for easy integration into my existing components, and because the library is built specifically for React, it works smoothly with features like useState and useEffect. This helped abstract away much of the complexity and kept my core code clean and focused. You can see the errors being displayed when a user either (1) tries to give more than 10 votes to a star or (2) tries to compare stars results without properly selecting stars from the drop down menu. 

### Connection to Backend 
In the backend, I managed how many times users have voted for stars in the finale. I kept a JSON file that would accumulate their votes and send it back to the front end to be displayed in a modal. 

The "form" the front end is posting to comes from the Finale Voting page where vote buttons increase a counter and the submit button will submit the "form" and send it to the backend via a POST call.  