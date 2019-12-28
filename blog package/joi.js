const Joi = require('joi')

const schema = {
  username: Joi.string().min(2).max(5).error(new Error('username 没有通过')),

}

Joi.validate({username: 'ab'}, schema)

async function run () {
  try {
    await Joi.validate({username: 'a'}, schema)
  } catch (error) {
    console.log(error.message);
    return
  }
  console.log('ol');
  
}

run ()