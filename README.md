# Node-API
mplement an API with the following end-points (they would be preceded by something like http://localhost:4000/api/). Your implementation should use Node, Express and Mongoose.

Endpoints	Actions	Intended Outcome

users	
GET	Respond with a List of users
POST	Create a new user. Respond with details of new user
OPTIONS	See the last tip at the bottom of the page

users/:id	
GET	Respond with details of specified user or 404 error
PUT	Replace entire user with supplied user or 404 error
DELETE	Delete specified user or 404 error

tasks	
GET	Respond with a List of tasks
POST	Create a new task. Respond with details of new task
OPTIONS	See the last tip at the bottom of the page
tasks/:id	

GET	Respond with details of specified task or 404 error
PUT	Replace entire task with supplied task or 404 error
DELETE	Delete specified user or 404 error
In addition, your implementation should support the following JSON encoded query string parameters for the GET requests to the users and tasks endpoints:

Paramter	Description
where	filter results based on JSON query
sort	specify the order in which to sort each specified field (1- ascending; -1 - descending)
select	specify the set of fields to include or exclude in each document (1 - include; 0 - exclude)
skip	specify the number of results to skip in the result set; useful for pagination
limit	specify the number of results to return (default should be 100 for tasks and unlimited for users)
count	if set to true, return the count of documents that match the query (instead of the documents themselves)

Table Schemas

User schema:

"name" - String
"email" - String
"pendingTasks" - [String] - The _id fields of the pending tasks that this user has
"dateCreated" - Date - should be set automatically by server

Task schema:

"name" - String
"description" - String
"deadline" - Date
"completed" - Boolean
"assignedUser" - String - The _id field of the user this task is assigned to - default ""
"assignedUserName" - String - The name field of the user this task is assigned to - default "unassigned"
"dateCreated" - Date - should be set automatically by server to present date

