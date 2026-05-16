package core

type VisitorStatisticsError struct {
	IsVisitorStatisticsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewVisitorStatisticsError(code string, msg string, ctx *Context) *VisitorStatisticsError {
	return &VisitorStatisticsError{
		IsVisitorStatisticsError: true,
		Sdk:              "VisitorStatistics",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *VisitorStatisticsError) Error() string {
	return e.Msg
}
