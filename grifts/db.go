package grifts

import (
	"github.com/markbates/grift/grift"
	"github.com/pkg/errors"
	"relay_pi/models"
)

var _ = grift.Namespace("db", func() {

	grift.Desc("seed", "Seeds a database")
	grift.Add("seed", func(c *grift.Context) error {
		if err := models.DB.TruncateAll(); err != nil {
			return errors.WithStack(err)
		}

		room := &models.Room{
			Name:        "Ground Floor",
			Description: "All devices on Ground Floor",
		}
		if err := models.DB.Create(room); err != nil {
			return errors.WithStack(err)
		}
		devices := models.Devices{
			{Name: "Living Room", Type: "dimmer"},
			{Name: "Kitchen", Type: "switch"},
			{Name: "Storage Room", Type: "shutter"},
		}
		for _, device := range devices {
			device.RoomID = room.ID
			if err := models.DB.Create(&device); err != nil {
				return errors.WithStack(err)
			}

			pins := models.Pins{
				{Name: "GPIO " + device.Name, PinNumber: 8},
				{Name: "GPIO " + device.Name, PinNumber: 10},
				{Name: "GPIO " + device.Name, PinNumber: 12},
			}

			for _, pin := range pins {
				pin.DeviceID = device.ID
				if err := models.DB.Create(&pin); err != nil {
					return errors.WithStack(err)
				}
			}
		}

		room2 := &models.Room{
			Name:        "Upstairs",
			Description: "All devices Upstairs",
		}

		if err := models.DB.Create(room2); err != nil {
			return errors.WithStack(err)
		}
		devices2 := models.Devices{
			{Name: "Bedroom", Type: "dimmer"},
			{Name: "Kids bedroom 1", Type: "switch"},
			{Name: "Kids bedroom 1", Type: "shutter"},
		}
		for _, device := range devices2 {
			device.RoomID = room2.ID
			if err := models.DB.Create(&device); err != nil {
				return errors.WithStack(err)
			}

			pins := models.Pins{
				{Name: "GPIO " + device.Name, PinNumber: 23},
				{Name: "GPIO " + device.Name, PinNumber: 24},
				{Name: "GPIO " + device.Name, PinNumber: 25},
			}

			for _, pin := range pins {
				pin.DeviceID = device.ID
				if err := models.DB.Create(&pin); err != nil {
					return errors.WithStack(err)
				}
			}
		}

		return nil
	})
})
