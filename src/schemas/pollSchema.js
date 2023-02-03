import Joi from "joi"

const titleSchema = Joi.object({
    title: Joi.string().required()
  })
export default titleSchema