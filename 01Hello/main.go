package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"

	"github.com/rs/cors"
)

type User struct {
	ID       string    `json:"id"`
	Username string `json:"username"`
	Password    string `json:"password"`
}
type Ubody struct {
	Name      string    `json:"name"`
	//Username string `json:"username"`
	Password    string `json:"password"`
}

var users []User

func main() {
	// Define API routes
	c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173"}, // Replace with your allowed origins
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
        AllowCredentials: true,
    })

    // Create your router or HTTP handler
    router := http.NewServeMux()
    // Add your routes to the router

    // Wrap the router or handler with the CORS middleware
    handler := c.Handler(router)

	router.HandleFunc("/users", getUsers)
	router.HandleFunc("/users/add", addUser)

	// Start the server
	log.Fatal(http.ListenAndServe(":8008", handler))
}

// Handler function for getting all users
func getUsers(w http.ResponseWriter, r *http.Request) {
	// Set the response content type as JSON
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Getting Users")
	// Convert the users slice to JSON
	json.NewEncoder(w).Encode(users)


}

// Handler function for adding a new user
func addUser(w http.ResponseWriter, r *http.Request) {
	// Parse the request body to extract user data
	var user User
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	var temp Ubody

	// Unmarshal the JSON into the User struct
	err = json.Unmarshal(body, &temp)
	if err != nil {
		http.Error(w, "Failed to parse JSON body", http.StatusBadRequest)
		return
	}

	// Access the data from the User struct
	fmt.Printf("Name: %s", temp.Name)
	fmt.Printf("Password: %s", temp.Password)
	// Add the user to the users slice
	rand.Seed(time.Now().UnixNano())

	// Generate a random integer between 0 and 100
	randomInt := rand.Intn(1001)
	fmt.Println(randomInt)
	var id string = temp.Name + strconv.Itoa(randomInt)
	user.ID = id 
	user.Username = temp.Name
	user.Password = temp.Password
	users = append(users, user)
	fmt.Print(users)
	// Set the response status code
	w.WriteHeader(http.StatusCreated)

	// _htmlContent := `
	// 	<!DOCTYPE html>
	// 	<html>
	// 	<head>
	// 		<title>Hello World</title>
	// 	</head>
	// 	<body>
	// 		<h1>Hello, World!</h1>
	// 	</body>
	// 	</html>
	// `

	// Set the Content-Type header to indicate HTML content
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	// Write the HTML content to the response
	fmt.Fprint(w, users)
}

