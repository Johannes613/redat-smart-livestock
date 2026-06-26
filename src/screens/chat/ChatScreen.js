import React, { useState, useRef } from 'react';
import { View, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontFamily, FontSize } from '../../theme';
import { Text, Card, Badge } from '../../components/ui';
import { mockCamels, mockAlerts, mockWeather } from '../../data/mockData';
import { useAuthStore } from '../../store/useAuthStore';
import { useCommunityStore } from '../../store/useCommunityStore';

const QUICK_QUESTIONS = [
  'Where is the nearest water source?',
  'Any disease outbreaks nearby?',
  'Best grazing areas today?',
  'How to treat heat stress?',
  'Nearest vet in Al Qua\'a?',
];

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

async function callGeminiAPI(history, contextData) {
  let startIndex = 0;
  while (startIndex < history.length && history[startIndex].role === 'assistant') {
    startIndex++;
  }

  const contents = history.slice(startIndex).map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const systemText = `You are REDAT AI, an expert AI assistant for camel farmers in Al Qua'a, UAE.
Here is the current live data from the app:
Farmer: ${contextData.user?.name} (Farm: ${contextData.user?.farmName})
Camels in herd: ${JSON.stringify(contextData.camels)}
Community Map Pins (water, grazing, diseases): ${JSON.stringify(contextData.pins)}
Active Alerts: ${JSON.stringify(contextData.alerts)}
Weather: ${JSON.stringify(contextData.weather)}

Use this context to give highly specific, accurate, and concise advice. Be friendly and helpful.`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: systemText }]
        },
        contents
      })
    });
    const data = await response.json();
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text;
    }
    console.warn("Gemini Error:", data);
    return "API Error: " + JSON.stringify(data);
  } catch (err) {
    console.warn("Gemini Network Error:", err);
    return "Network Error: " + err.message;
  }
}

export function ChatScreen({ navigation }) {
  const currentUser = useAuthStore(state => state.currentUser);
  const communityPins = useCommunityStore(state => state.pins);
  const [messages, setMessages] = useState([
    { id: '1', role: 'assistant', content: `Hello ${currentUser ? currentUser.name.split(' ')[0] : 'Farmer'}, I'm REDAT AI. How can I help with your herd today?`, timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [processingAudio, setProcessingAudio] = useState(false);
  const listRef = useRef(null);

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      setProcessingAudio(true);
      // Simulate AI Transcription (Whisper/Gemini)
      setTimeout(() => {
        setProcessingAudio(false);
        setInput("Where is the nearest water source?");
      }, 1500);
    } else {
      setRecording(true);
    }
  };

  const sendMessage = async (text) => {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content, timestamp: new Date().toISOString() };
    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    setInput('');
    setLoading(true);

    const contextData = {
      user: currentUser,
      camels: mockCamels,
      pins: communityPins,
      alerts: mockAlerts,
      weather: mockWeather
    };

    const replyText = await callGeminiAPI(newHistory, contextData);

    const aiMsg = { id: (Date.now() + 1).toString(), role: 'assistant', content: replyText, timestamp: new Date().toISOString() };
    setMessages(m => [...m, aiMsg]);
    setLoading(false);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.role === 'user';
    return (
      <View style={{ alignItems: isUser ? 'flex-end' : 'flex-start', marginBottom: Spacing[3] }}>
        {!isUser && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.accentMuted, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.accentBorder, overflow: 'hidden' }}>
              <Image source={require('../../../assets/redat_ai.png')} style={{ width: 16, height: 16, tintColor: Colors.accent }} resizeMode="contain" />
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
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.accentMuted, borderWidth: 1, borderColor: Colors.accentBorder, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Image source={require('../../../assets/redat_ai.png')} style={{ width: 26, height: 26, tintColor: Colors.accent }} resizeMode="contain" />
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
              <View style={{ backgroundColor: Colors.bg.card, borderRadius: Radius.xl, padding: Spacing[4], borderWidth: 1, borderColor: Colors.accentBorder }}>
                <Text variant="titleSmall" color={Colors.accent} style={{ marginBottom: 4 }}>
                  Welcome to REDAT AI 🐪
                </Text>
                <Text variant="bodySmall" color={Colors.text.secondary}>
                  I have access to your farm data, community pins, weather, and regional disease reports. Ask me anything in Arabic or English.
                </Text>
              </View>

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
                  <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: Colors.accentMuted, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <Image source={require('../../../assets/redat_ai.png')} style={{ width: 16, height: 16, tintColor: Colors.accent }} resizeMode="contain" />
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
          <Pressable
            onPress={toggleRecording}
            disabled={processingAudio}
            style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: recording ? Colors.error + '20' : processingAudio ? Colors.warning + '20' : Colors.bg.elevated, borderWidth: 1, borderColor: recording ? Colors.error : processingAudio ? Colors.warning : 'transparent', alignItems: 'center', justifyContent: 'center' }}
            accessibilityRole="button"
            accessibilityLabel="Record voice message"
          >
            <Ionicons name={recording ? 'stop-circle' : processingAudio ? 'hourglass-outline' : 'mic-outline'} size={20} color={recording ? Colors.error : processingAudio ? Colors.warning : Colors.text.secondary} />
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
