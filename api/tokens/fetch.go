package tokens

import (
	"fmt"
	"net/http"
)

// Handler serverless API
func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "<h1>Hello from Go!</h1>")
}
