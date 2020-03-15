package actions

import (
	"github.com/gobuffalo/buffalo"
	"net/http"
)

// Service worker file
func ServiceWorkerHandler(c buffalo.Context) error {
	c.Response().Header().Set("Service-Worker-Allowed", "/")

	return c.Render(http.StatusOK, r.JavaScript("serviceWorker.js"))
}
