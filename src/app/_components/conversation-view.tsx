import React from 'react'

const ConversationView = ({conversation}: any) => {
  console.log("conv", conversation)
  return (
    <div>
        ConversationView
        <div>
          {conversation.conversationName}

        </div>
    </div>
  )
}

export default ConversationView