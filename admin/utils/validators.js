import isNull from 'validator/lib/isNull'
import trim from 'validator/lib/trim'

export const required = (val) => !isNull(trim(val))
