package theme

import (
	"html/template"
	"io"

	"github.com/labstack/echo"
)

type Template struct {
	templates *template.Template
}

var Theme = "eevee"

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func Setup(e *echo.Echo) {
	//var t Template

	//t.templates, _ = template.ParseGlob("public/themes/" + Theme + "/*.html")
	t := &Template{
		templates: template.Must(template.ParseGlob("public/themes/" + Theme + "/*.html")),
	}

	//e.Index("public/themes/" + Theme + "/index.html")
	e.Static("/assets", "public/themes/"+Theme+"/assets")
	//e.Favicon("public/themes/" + Theme + "favicon.ico")
	e.File("/favicon.ico", "public/themes/"+Theme+"favicon.ico")
	e.SetRenderer(t)
}

func Change(theme string, e *echo.Echo) {
	Theme = theme
	Setup(e)
}
