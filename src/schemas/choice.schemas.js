import Joi from "joi"

export const choiceSchema =Joi.object({
    title: Joi.string().required().unique()
})
