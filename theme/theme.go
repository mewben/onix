package theme

import (
	"html/template"
	"io"

	"github.com/labstack/echo"
)

// Template struct
type Template struct {
	templates *template.Template
}

// Theme default
var Theme = "eevee"

// Render function
func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

// Setup theme
func Setup(e *echo.Echo, mode string) {
	var t Template
	if mode == "dev" {
		// development
		t.templates = template.Must(template.ParseGlob("internals/themes/" + Theme + "/*.html"))

		e.Static("/assets", "internals/themes/"+Theme+"/assets")
		e.File("/favicon.ico", "internals/themes/"+Theme+"favicon.ico")
	} else {
		// production
		t.templates = template.Must(template.ParseGlob("public/themes/" + Theme + "/*.html"))

		e.Static("/assets", "public/themes/"+Theme+"/assets")
		e.File("/favicon.ico", "public/themes/"+Theme+"favicon.ico")
	}

	e.SetRenderer(&t)
}

// Change theme
func Change(theme string, e *echo.Echo) {
	Theme = theme
	Setup(e, "")
}
