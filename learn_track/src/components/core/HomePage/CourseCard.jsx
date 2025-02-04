import React from 'react'

function CourseCard(key, currentCard,cardData) {
  return (
    <div key={key}>
        {cardData}
    </div>
  )
}

export default CourseCard