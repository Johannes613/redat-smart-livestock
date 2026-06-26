import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Pressable, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius } from '../../theme';
import { Text, Card, Button, Input, Badge } from '../../components/ui';
import { PIN_CONFIG } from '../../components/community/PinCard';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useCommunityStore } from '../../store/useCommunityStore';
import { useAuthStore } from '../../store/useAuthStore';
import { mockUser } from '../../data/mockData';

const CATEGORIES = Object.entries(PIN_CONFIG).map(([key, cfg]) => ({ key, ...cfg }));

export function AddPinScreen({ navigation }) {
  const [form, setForm] = useState({ title: '', description: '', category: 'water_source' });
  const [recording, setRecording] = useState(false);
  const [processingAudio, setProcessingAudio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [locLoading, setLocLoading] = useState(true);
  const currentUser = useAuthStore(state => state.currentUser);
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setLocLoading(false);
    })();
  }, []);

  const pickMedia = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'video' ? ImagePicker.MediaTypeOptions.Videos : ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    if (!form.title || !form.description) return;
    setLoading(true);

    const newPin = {
      id: Date.now().toString(),
      authorId: currentUser?.id || mockUser.id,
      authorName: currentUser?.name || mockUser.name,
      category: form.category,
      title: form.title,
      description: form.description,
      location: location || { latitude: 23.5021, longitude: 55.8034 },
      images: image ? [image] : [],
      isVerified: false,
      likes: 0,
      likedBy: [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    useCommunityStore.getState().addPin(newPin);
    
    setTimeout(() => { setLoading(false); navigation.goBack(); }, 1000);
  };

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      setProcessingAudio(true);
      // Simulate AI Transcription (Whisper/Gemini)
      setTimeout(() => {
        setProcessingAudio(false);
        setForm(f => ({ ...f, description: "This grazing area is good during winter." }));
      }, 1500);
    } else {
      setRecording(true);
    }
  };

  const selectedCfg = PIN_CONFIG[form.category];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing[4] }}>
          <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Close">
            <Ionicons name="close" size={24} color={Colors.text.primary} />
          </Pressable>
          <Text variant="titleMedium">Post to Community</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: Spacing[4], gap: Spacing[4], paddingBottom: Spacing[10] }} keyboardShouldPersistTaps="handled">

          {/* Category picker */}
          <View>
            <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>SELECT CATEGORY</Text>
            <FlatList
              horizontal
              data={CATEGORIES}
              keyExtractor={i => i.key}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: Spacing[2] }} />}
              renderItem={({ item }) => {
                const active = form.category === item.key;
                return (
                  <Pressable
                    onPress={() => set('category')(item.key)}
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 12, borderRadius: Radius.full, backgroundColor: active ? item.color + '20' : Colors.bg.card, borderWidth: 1, borderColor: active ? item.color : Colors.border.default }}
                    accessibilityRole="radio"
                  >
                    <Ionicons name={item.icon} size={15} color={active ? item.color : Colors.text.tertiary} />
                    <Text variant="labelSmall" color={active ? item.color : Colors.text.secondary}>{item.label}</Text>
                  </Pressable>
                );
              }}
            />
          </View>

          {/* Selected category preview */}
          <Card variant="glass" padding={Spacing[3]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
              <View style={{ width: 40, height: 40, borderRadius: Radius.lg, backgroundColor: selectedCfg.color + '20', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={selectedCfg.icon} size={20} color={selectedCfg.color} />
              </View>
              <View>
                <Badge label={selectedCfg.label} color={selectedCfg.color} size="sm" />
                <Text variant="caption" color={Colors.text.tertiary} style={{ marginTop: 2 }}>Category selected</Text>
              </View>
            </View>
          </Card>

          {/* Form */}
          <Card variant="glass" padding={Spacing[4]} style={{ gap: Spacing[4] }}>
            <Input label="Title" value={form.title} onChangeText={set('title')} placeholder="Brief title for your post" required />
            <Input label="Description" value={form.description} onChangeText={set('description')} placeholder="Describe what you found or observed..." multiline numberOfLines={4} style={{ height: 100, textAlignVertical: 'top' }} required />
          </Card>

          {/* Media */}
          <Card variant="glass" padding={Spacing[4]} style={{ gap: Spacing[3] }}>
            <Text variant="titleSmall" color={Colors.text.secondary}>Attach Media</Text>
            <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
              <Pressable onPress={() => pickMedia('photo')} style={{ flex: 1, height: 80, borderRadius: Radius.lg, backgroundColor: Colors.bg.elevated, borderWidth: 1, borderColor: Colors.border.accent, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4, overflow: 'hidden' }} accessibilityRole="button">
                {image && !image.endsWith('.mp4') && !image.endsWith('.mov') ? (
                  <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <>
                    <Ionicons name="camera-outline" size={22} color={Colors.accent} />
                    <Text variant="caption" color={Colors.accent}>Photo</Text>
                  </>
                )}
              </Pressable>
              <Pressable onPress={() => pickMedia('video')} style={{ flex: 1, height: 80, borderRadius: Radius.lg, backgroundColor: Colors.bg.elevated, borderWidth: 1, borderColor: Colors.border.accent, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4, overflow: 'hidden' }} accessibilityRole="button" accessibilityLabel="Add video">
                {image && (image.endsWith('.mp4') || image.endsWith('.mov')) ? (
                   <>
                     <Ionicons name="play-circle-outline" size={32} color={Colors.white} />
                     <View style={{ position: 'absolute', bottom: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 4, borderRadius: 4 }}>
                       <Text variant="caption" color={Colors.white}>Video</Text>
                     </View>
                   </>
                ) : (
                  <>
                    <Ionicons name="videocam-outline" size={22} color={Colors.accent} />
                    <Text variant="caption" color={Colors.accent}>Video</Text>
                  </>
                )}
              </Pressable>
              <Pressable
                onPress={toggleRecording}
                disabled={processingAudio}
                style={{ flex: 1, height: 80, borderRadius: Radius.lg, backgroundColor: recording ? Colors.error + '20' : processingAudio ? Colors.warning + '20' : Colors.bg.elevated, borderWidth: 1, borderColor: recording ? Colors.error : processingAudio ? Colors.warning : Colors.border.accent, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                accessibilityRole="button"
                accessibilityLabel={recording ? 'Stop recording' : 'Record voice note'}
              >
                <Ionicons name={recording ? 'stop-circle' : processingAudio ? 'hourglass-outline' : 'mic-outline'} size={22} color={recording ? Colors.error : processingAudio ? Colors.warning : Colors.accent} />
                <Text variant="caption" color={recording ? Colors.error : processingAudio ? Colors.warning : Colors.accent}>{recording ? 'Stop' : processingAudio ? 'Processing' : 'Voice'}</Text>
              </Pressable>
            </View>
            {recording && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: Colors.errorMuted, borderRadius: Radius.md }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.error }} />
                <Text variant="caption" color={Colors.error}>Recording Arabic voice note...</Text>
              </View>
            )}
            {processingAudio && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, padding: 10, backgroundColor: Colors.warningMuted, borderRadius: Radius.md }}>
                <Ionicons name="sparkles" size={14} color={Colors.warning} />
                <Text variant="caption" color={Colors.warning}>AI (Whisper) is transcribing to text...</Text>
              </View>
            )}
          </Card>

          {/* Location */}
          <Card variant="glass" padding={Spacing[3]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
              <Ionicons name="location-outline" size={20} color={Colors.success} />
              <View style={{ flex: 1 }}>
                <Text variant="labelMedium">Current Location</Text>
                <Text variant="caption" color={Colors.text.tertiary}>
                  {locLoading ? 'Fetching location...' : location ? `${location.latitude.toFixed(4)}°N, ${location.longitude.toFixed(4)}°E` : '23.5021°N, 55.8034°E — Default'}
                </Text>
              </View>
              <Badge label={location ? "GPS" : "WAIT"} color={Colors.success} size="sm" />
            </View>
          </Card>

          <Button label="Post to Community" onPress={handlePost} loading={loading} fullWidth size="lg" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
