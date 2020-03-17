package actions

import (
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/envy"
	"net/http"
)

// Service worker file
func ServiceWorkerHandler(c buffalo.Context) error {
	c.Response().Header().Set("Service-Worker-Allowed", "/")

	goEnv := envy.Get("GO_ENV", "development")
	c.Set("environment", goEnv)

	return c.Render(http.StatusOK, r.JavaScript("serviceWorker.js"))
}
