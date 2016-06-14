import React from 'react'
import { Errors } from 'react-redux-form'

const ErrBlock = (model) => {
	return (
		<Errors
			className="text-danger sm"
			show="touched"
			model={model}
			messages={{
				required: '* This field is required.',
				similar: '* Not match.',
			}} />
	)
}

export default ErrBlock
