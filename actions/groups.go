package actions

import (
	"fmt"
	"github.com/gobuffalo/buffalo"
	"github.com/gobuffalo/pop"
	"github.com/gobuffalo/x/responder"
	"net/http"
	"relay_pi/models"
)

// This file is generated by Buffalo. It offers a basic structure for
// adding, editing and deleting a page. If your model is more
// complex or you need more than the basic implementation you need to
// edit this file.

// Following naming logic is implemented in Buffalo:
// Model: Singular (Group)
// DB Table: Plural (groups)
// Resource: Plural (Groups)
// Path: Plural (/groups)
// View Template Folder: Plural (/templates/groups/)

// GroupsResource is the resource for the Group model
type GroupsResource struct {
	buffalo.Resource
}

// List gets all Groups. This function is mapped to the path
// GET /groups
func (v GroupsResource) List(c buffalo.Context) error {
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	groups := &models.Groups{}

	if err := tx.Eager("Devices.Pins").All(groups); err != nil {
		return err
	}

	return c.Render(200, r.JSON(groups))
}

// Show gets the data for one Group. This function is mapped to
// the path GET /groups/{group_id}
func (v GroupsResource) Show(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Group
	group := &models.Group{}

	// To find the Group the parameter group_id is used.
	if err := tx.Eager().Find(group, c.Param("group_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	return c.Render(200, r.JSON(group))
}

// New renders the form for creating a new Group.
// This function is mapped to the path GET /groups/new
func (v GroupsResource) New(c buffalo.Context) error {
	c.Set("group", &models.Group{})

	return c.Render(http.StatusOK, r.HTML("/groups/new.plush.html"))
}

// Create adds a Group to the DB. This function is mapped to the
// path POST /groups
func (v GroupsResource) Create(c buffalo.Context) error {
	// Allocate an empty Group
	group := &models.Group{}

	// Bind group to the html form elements
	if err := c.Bind(group); err != nil {
		return err
	}

	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Validate the data from the html form
	verrs, err := tx.ValidateAndCreate(group)
	if err != nil {
		return err
	}

	if verrs.HasAny() {
		return responder.Wants("html", func(c buffalo.Context) error {
			// Make the errors available inside the html template
			c.Set("errors", verrs)

			// Render again the new.html template that the user can
			// correct the input.
			c.Set("group", group)

			return c.Render(http.StatusUnprocessableEntity, r.HTML("/groups/new.plush.html"))
		}).Wants("json", func(c buffalo.Context) error {
			return c.Render(http.StatusUnprocessableEntity, r.JSON(verrs))
		}).Wants("xml", func(c buffalo.Context) error {
			return c.Render(http.StatusUnprocessableEntity, r.XML(verrs))
		}).Respond(c)
	}

	return responder.Wants("html", func(c buffalo.Context) error {
		// If there are no errors set a success message
		c.Flash().Add("success", T.Translate(c, "group.created.success"))

		// and redirect to the show page
		return c.Redirect(http.StatusSeeOther, "/groups/%v", group.ID)
	}).Wants("json", func(c buffalo.Context) error {
		return c.Render(http.StatusCreated, r.JSON(group))
	}).Wants("xml", func(c buffalo.Context) error {
		return c.Render(http.StatusCreated, r.XML(group))
	}).Respond(c)
}

// Edit renders a edit form for a Group. This function is
// mapped to the path GET /groups/{group_id}/edit
func (v GroupsResource) Edit(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Group
	group := &models.Group{}

	if err := tx.Find(group, c.Param("group_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	c.Set("group", group)
	return c.Render(http.StatusOK, r.HTML("/groups/edit.plush.html"))
}

// Update changes a Group in the DB. This function is mapped to
// the path PUT /groups/{group_id}
func (v GroupsResource) Update(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Group
	group := &models.Group{}

	if err := tx.Find(group, c.Param("group_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	// Bind Group to the html form elements
	if err := c.Bind(group); err != nil {
		return err
	}

	verrs, err := tx.ValidateAndUpdate(group)
	if err != nil {
		return err
	}

	if verrs.HasAny() {
		return responder.Wants("html", func(c buffalo.Context) error {
			// Make the errors available inside the html template
			c.Set("errors", verrs)

			// Render again the edit.html template that the user can
			// correct the input.
			c.Set("group", group)

			return c.Render(http.StatusUnprocessableEntity, r.HTML("/groups/edit.plush.html"))
		}).Wants("json", func(c buffalo.Context) error {
			return c.Render(http.StatusUnprocessableEntity, r.JSON(verrs))
		}).Wants("xml", func(c buffalo.Context) error {
			return c.Render(http.StatusUnprocessableEntity, r.XML(verrs))
		}).Respond(c)
	}

	return responder.Wants("html", func(c buffalo.Context) error {
		// If there are no errors set a success message
		c.Flash().Add("success", T.Translate(c, "group.updated.success"))

		// and redirect to the show page
		return c.Redirect(http.StatusSeeOther, "/groups/%v", group.ID)
	}).Wants("json", func(c buffalo.Context) error {
		return c.Render(http.StatusOK, r.JSON(group))
	}).Wants("xml", func(c buffalo.Context) error {
		return c.Render(http.StatusOK, r.XML(group))
	}).Respond(c)
}

// Destroy deletes a Group from the DB. This function is mapped
// to the path DELETE /groups/{group_id}
func (v GroupsResource) Destroy(c buffalo.Context) error {
	// Get the DB connection from the context
	tx, ok := c.Value("tx").(*pop.Connection)
	if !ok {
		return fmt.Errorf("no transaction found")
	}

	// Allocate an empty Group
	group := &models.Group{}

	// To find the Group the parameter group_id is used.
	if err := tx.Find(group, c.Param("group_id")); err != nil {
		return c.Error(http.StatusNotFound, err)
	}

	if err := tx.Destroy(group); err != nil {
		return err
	}

	return c.Render(http.StatusOK, r.JSON(group))
}
