import React, { useState, useRef } from 'react';
import { View, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontFamily, FontSize } from '../../theme';
import { Text, Card, Badge } from '../../components/ui';
import { mockChatHistory } from '../../data/mockData';

const QUICK_QUESTIONS = [
  'Where is the nearest water source?',
  'Any disease outbreaks nearby?',
  'Best grazing areas today?',
  'How to treat heat stress?',
  'Nearest vet in Al Qua\'a?',
];

const AI_RESPONSES = {
  default: 'I am analyzing your farm data and community reports to answer your question. Based on current conditions in Al Qua\'a, here is what I found...',
  water: 'The closest verified water source is the fresh water well at Wadi Al Ain, ~2.1km northeast. It was last verified 2 days ago and supports up to 50 camels.',
  disease: 'There is an active camel pox report 3.2km from your farm, posted by Khalid Al Zaabi. I recommend isolating any new camels and monitoring your herd for skin lesions.',
  grazing: 'Community reports indicate excellent grazing near Jebel Hafit foothills — green patches after last week\'s rain. 31 farmers have liked this report.',
  stress: 'For heat stress: move the camel to shade immediately, provide cool water every 30 minutes, wet the neck and head, and monitor body temperature. Call a vet if temperature exceeds 41°C.',
};

function getResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('water')) return AI_RESPONSES.water;
  if (lower.includes('disease') || lower.includes('outbreak')) return AI_RESPONSES.disease;
  if (lower.includes('grazing')) return AI_RESPONSES.grazing;
  if (lower.includes('stress') || lower.includes('heat')) return AI_RESPONSES.stress;
  return AI_RESPONSES.default;
}

export function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState(mockChatHistory);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const listRef = useRef(null);

  const sendMessage = (text) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const userMsg = { id: Date.now().toString(), role: 'user', content, timestamp: new Date().toISOString() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant', content: getResponse(content), timestamp: new Date().toISOString() };
      setMessages(m => [...m, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    return (
      <View style={{ alignItems: isUser ? 'flex-end' : 'flex-start', marginBottom: Spacing[3] }}>
        {!isUser && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.accentMuted, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.accentBorder }}>
              <Ionicons name="sparkles" size={12} color={Colors.accent} />
            </View>
            <Text variant="caption" color={Colors.accent}>REDAT AI</Text>
          </View>
        )}
        <View style={{
          maxWidth: '82%',
          padding: Spacing[3],
          borderRadius: Radius.xl,
          borderBottomRightRadius: isUser ? 4 : Radius.xl,
          borderBottomLeftRadius: isUser ? Radius.xl : 4,
          backgroundColor: isUser ? Colors.accent : Colors.bg.card,
          borderWidth: isUser ? 0 : 1,
          borderColor: Colors.border.default,
        }}>
          <Text variant="bodySmall" color={isUser ? Colors.white : Colors.text.primary} style={{ lineHeight: 20 }}>
            {item.content}
          </Text>
          <Text variant="caption" color={isUser ? 'rgba(255,255,255,0.6)' : Colors.text.tertiary} style={{ marginTop: 4 }}>
            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4], borderBottomWidth: 1, borderBottomColor: Colors.border.muted }}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.accentMuted, borderWidth: 1, borderColor: Colors.accentBorder, alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name="sparkles" size={20} color={Colors.accent} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium">REDAT AI</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.success }} />
            <Text variant="caption" color={Colors.success}>Online · Arabic & English</Text>
          </View>
        </View>
        <Ionicons name="information-circle-outline" size={24} color={Colors.text.tertiary} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={m => m.id}
          contentContainerStyle={{ padding: Spacing[4], paddingBottom: Spacing[4] }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
          ListHeaderComponent={() => (
            <View style={{ gap: Spacing[4], marginBottom: Spacing[4] }}>
              {/* Intro card */}
              <LinearGradient colors={[Colors.accentMuted, 'transparent']} style={{ borderRadius: Radius.xl, padding: Spacing[4], borderWidth: 1, borderColor: Colors.accentBorder }}>
                <Text variant="titleSmall" color={Colors.accent} style={{ marginBottom: 4 }}>
                  Welcome to REDAT AI 🐪
                </Text>
                <Text variant="bodySmall" color={Colors.text.secondary}>
                  I have access to your farm data, community pins, weather, and regional disease reports. Ask me anything in Arabic or English.
                </Text>
              </LinearGradient>

              {/* Quick questions */}
              <View>
                <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[2] }}>QUICK QUESTIONS</Text>
                <View style={{ gap: Spacing[2] }}>
                  {QUICK_QUESTIONS.map(q => (
                    <Pressable key={q} onPress={() => sendMessage(q)} style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[2], padding: Spacing[3], backgroundColor: Colors.bg.card, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border.default }} accessibilityRole="button">
                      <Ionicons name="chatbubble-outline" size={15} color={Colors.accent} />
                      <Text variant="bodySmall" color={Colors.text.secondary} style={{ flex: 1 }}>{q}</Text>
                      <Ionicons name="arrow-forward" size={14} color={Colors.text.tertiary} />
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          )}
          renderItem={renderMessage}
          ListFooterComponent={() =>
            loading ? (
              <View style={{ alignItems: 'flex-start', marginBottom: Spacing[3] }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.accentMuted, alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons name="sparkles" size={12} color={Colors.accent} />
                  </View>
                  <Text variant="caption" color={Colors.accent}>REDAT AI is thinking...</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 6, padding: Spacing[3], backgroundColor: Colors.bg.card, borderRadius: Radius.xl, borderBottomLeftRadius: 4 }}>
                  {[0, 1, 2].map(i => (
                    <View key={i} style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent, opacity: 0.5 + i * 0.25 }} />
                  ))}
                </View>
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />

        {/* Input bar */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: Spacing[2], padding: Spacing[3], borderTopWidth: 1, borderTopColor: Colors.border.muted, backgroundColor: Colors.bg.surface }}>
          <Pressable style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.bg.elevated, alignItems: 'center', justifyContent: 'center' }} accessibilityRole="button" accessibilityLabel="Record voice message">
            <Ionicons name="mic-outline" size={20} color={Colors.text.secondary} />
          </Pressable>
          <TextInput
            style={{ flex: 1, minHeight: 40, maxHeight: 120, backgroundColor: Colors.bg.elevated, borderRadius: Radius.xl, borderWidth: 1, borderColor: Colors.border.default, paddingHorizontal: 14, paddingVertical: 10, fontFamily: FontFamily.mono, fontSize: FontSize.base, color: Colors.text.primary }}
            placeholder="Ask REDAT AI..."
            placeholderTextColor={Colors.text.tertiary}
            value={input}
            onChangeText={setInput}
            multiline
            returnKeyType="send"
            onSubmitEditing={() => sendMessage()}
          />
          <Pressable
            onPress={() => sendMessage()}
            disabled={!input.trim() || loading}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: input.trim() ? Colors.accent : Colors.bg.elevated, alignItems: 'center', justifyContent: 'center', opacity: input.trim() ? 1 : 0.5 }}
            accessibilityRole="button" accessibilityLabel="Send message"
          >
            <Ionicons name="send" size={18} color={input.trim() ? Colors.white : Colors.text.tertiary} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
