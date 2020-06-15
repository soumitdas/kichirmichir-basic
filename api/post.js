const axios = require('axios')
const url = 'https://jsonbox.io/844bbad7_2772_467b_bf70_dbb529001cbf'

module.exports = (req, res) => {
  if(req.method != 'POST' || !req.body){
    res.status(500).json({
      error: "Only POST method allowed"
    })
  }
  else {
    const data = req.body
    if (!data.text) {
      res.status(500).json({
        error: "Data missing"
      })
    } else {
      if (!data.name) {
          data.name = "Anonymous"
      }
      if (!data.tags) {
          data.tags = "notag"
      }
      postMsg(req.body).then((data) => {
        res.status(200).json({ status: 'success', data: data })
      })
    }
  }
}
async function postMsg(data) {
  try {
    const response = await axios({
      method: 'post',
      headers: { 'Content-Type': 'application/json','x-api-key': process.env.JB_API_KEY },
      url: url,
      data: JSON.stringify(data)
    })
    return response.data
    //console.log(response.data);
  } catch (error) {
    console.error(error)
  }
}


