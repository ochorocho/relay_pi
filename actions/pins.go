package actions

import (
	"fmt"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/pop"
	"net/http"
	"relay_pi/models"
)

// Following naming logic is implemented in Buffalo:
// Model: Singular (Pin)
// DB Table: Plural (pins)
// Resource: Plural (Pins)
// Path: Plural (/pins)
// View Template Folder: Plural (/templates/pins/)

// PinsResource is the resource for the Pin model
type PinsResource struct {
	buffalo.Resource
}

// List gets all Pins. This function is mapped to the path
// GET /pins
func (v PinsResource) List(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	pins := &models.Pins{}

	// Retrieve all Pins from the DB
	if err := tx.All(pins); err != nil {
		return err
	}

	return c.Render(200, r.JSON(pins))
}

// Show gets the data for one Pin. This function is mapped to
// the path GET /pins/{pin_id}
func (v PinsResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Pin
	pin := &models.Pin{}

	// To find the Pin the parameter pin_id is used.
	if err := tx.Find(pin, c.Param("pin_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	return c.Render(200, r.JSON(pin))
}

// Create adds a Pin to the DB. This function is mapped to the
// path POST /pins
func (v PinsResource) Create(c buffalo.Context) error {
	// Allocate an empty Pin
	pin := &models.Pin{}

	// Bind pin to the html form elements
	if err := c.Bind(pin); err != nil {
		return err
	}

	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Validate the data from the html form
	verrs, err := tx.ValidateAndCreate(pin)
	if err != nil {
		return err
	}

	if verrs.HasAny() {
		return c.Render(http.StatusUnprocessableEntity, r.JSON(verrs))
	}

	return c.Render(http.StatusCreated, r.JSON(pin))
}

// Update changes a Pin in the DB. This function is mapped to
// the path PUT /pins/{pin_id}
func (v PinsResource) Update(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Pin
	pin := &models.Pin{}

	if err := tx.Find(pin, c.Param("pin_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	// Bind Pin to the html form elements
	if err := c.Bind(pin); err != nil {
		return err
	}

	verrs, err := tx.ValidateAndUpdate(pin)
	if err != nil {
		return err
	}

	if verrs.HasAny() {
		return c.Render(http.StatusUnprocessableEntity, r.JSON(verrs))
	}

	return c.Render(200, r.JSON(pin))
}

// Destroy deletes a Pin from the DB. This function is mapped
// to the path DELETE /pins/{pin_id}
func (v PinsResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Pin
	pin := &models.Pin{}

	// To find the Pin the parameter pin_id is used.
	if err := tx.Find(pin, c.Param("pin_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	if err := tx.Destroy(pin); err != nil {
		return err
	}

	return c.Render(200, r.JSON(pin))
}
