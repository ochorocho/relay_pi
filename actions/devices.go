package actions

import (
	"fmt"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/pop"
	"net/http"
	"relay_pi/models"
)

// Following naming logic is implemented in Buffalo:
// Model: Singular (Device)
// DB Table: Plural (devices)
// Resource: Plural (Devices)
// Path: Plural (/devices)
// View Template Folder: Plural (/templates/devices/)

// DevicesResource is the resource for the Device model
type DevicesResource struct {
	buffalo.Resource
}

// List gets all Devices. This function is mapped to the path
// GET /devices
func (v DevicesResource) List(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	devices := &models.Devices{}

	// Retrieve all Devices from the DB
	if err := tx.Eager().All(devices); err != nil {
		return err
	}

	return c.Render(200, r.JSON(devices))
}

// Show gets the data for one Device. This function is mapped to
// the path GET /devices/{device_id}
func (v DevicesResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Device
	devex := &models.Device{}

	// To find the Device the parameter device_id is used.
	if err := tx.Find(devex, c.Param("devex_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	return c.Render(200, r.JSON(devex))
}

// Create adds a Device to the DB. This function is mapped to the
// path POST /devices
func (v DevicesResource) Create(c buffalo.Context) error {
	// Allocate an empty Device
	devex := &models.Device{}

	// Bind devex to the html form elements
	if err := c.Bind(devex); err != nil {
		return err
	}

	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Validate the data from the html form
	verrs, err := tx.ValidateAndCreate(devex)
	if err != nil {
		return err
	}

	if verrs.HasAny() {
		return c.Render(http.StatusUnprocessableEntity, r.JSON(verrs))
	}

	return c.Render(http.StatusCreated, r.JSON(devex))
}

// Update changes a Device in the DB. This function is mapped to
// the path PUT /devices/{device_id}
func (v DevicesResource) Update(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Device
	devex := &models.Device{}

	if err := tx.Find(devex, c.Param("devex_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	// Bind Device to the html form elements
	if err := c.Bind(devex); err != nil {
		return err
	}

	verrs, err := tx.ValidateAndUpdate(devex)
	if err != nil {
		return err
	}

	if verrs.HasAny() {
		return c.Render(http.StatusUnprocessableEntity, r.JSON(verrs))
	}

	return c.Render(http.StatusOK, r.JSON(devex))
}

// Destroy deletes a Device from the DB. This function is mapped
// to the path DELETE /devices/{device_id}
func (v DevicesResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Device
	devex := &models.Device{}

	// To find the Device the parameter device_id is used.
	if err := tx.Find(devex, c.Param("devex_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	if err := tx.Destroy(devex); err != nil {
		return err
	}

	return c.Render(http.StatusOK, r.JSON(devex))
}
