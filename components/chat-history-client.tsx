import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Chat {
  id: string
  messages: Array<{
    content: string
  }>
  createdAt: string
}

export function ChatHistoryClient() {
  const router = useRouter()
  const [chats, setChats] = useState<Chat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)

  const handleNewChat = () => {
    router.push("/")
  }

  const handleChatClick = (chatId: string) => {
    setCurrentChatId(chatId)
    router.push(`/chat/${chatId}`)
  }

  const loadMore = async () => {
    // Implementar lógica de carregamento
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Histórico de Conversas</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNewChat}
          title="Nova conversa"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            Erro ao carregar histórico
          </div>
        ) : chats.length === 0 ? (
          <div className="text-center text-muted-foreground p-4">
            Nenhuma conversa encontrada
          </div>
        ) : (
          <div className="space-y-2">
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant={chat.id === currentChatId ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleChatClick(chat.id)}
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">
                    {chat.messages[0]?.content.slice(0, 30) || "Nova conversa"}
                    {chat.messages[0]?.content.length > 30 ? "..." : ""}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(chat.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>

      {hasMore && (
        <div className="p-2 border-t">
          <Button
            variant="ghost"
            className="w-full"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900" />
            ) : (
              "Carregar mais"
            )}
          </Button>
        </div>
      )}
    </div>
  )
} 