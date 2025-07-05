import { NavigationContainer } from '@react-navigation/native'
import Routes from './src/routes'
import { useEffect, useState } from 'react'
import { supabase } from './src/lib/supabaseClient'
import { ActivityIndicator, View } from 'react-native'
import type { Session } from '@supabase/supabase-js' 

export default function App() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null) // TIPAGEM CORRETA

  useEffect(() => {
    const session = supabase.auth.session()
    setSession(session)
    setLoading(false)

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
    return () => listener?.unsubscribe()
  }, [])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Routes session={session} />
    </NavigationContainer>
  )
}