import React from 'react'

function Movie({match}) {
    console.log(match.params.id)
  return (
    <div>Movie</div>
  )
}

export default Movie