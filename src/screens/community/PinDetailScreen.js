import React, { useState } from 'react';
import { View, ScrollView, Pressable, TextInput, Share, Linking, Alert, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontFamily, FontSize } from '../../theme';
import { Text, Card, Badge, Button } from '../../components/ui';
import { PIN_CONFIG } from '../../components/community/PinCard';
import { mockPins, mockUser } from '../../data/mockData';
import { useCommunityStore } from '../../store/useCommunityStore';

function timeAgo(d) {
  const diff = (Date.now() - new Date(d).getTime()) / 1000;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function PinDetailScreen({ route, navigation }) {
  const { pinId } = route.params;
  const pin = useCommunityStore(state => state.pins.find(p => p.id === pinId));
  const addComment = useCommunityStore(state => state.addComment);
  const toggleLike = useCommunityStore(state => state.toggleLike);
  const [comment, setComment] = useState('');
  if (!pin) return null;

  const cfg = PIN_CONFIG[pin.category];

  const handleLike = () => toggleLike(pin.id, mockUser.id);

  const handleComment = () => {
    if (!comment.trim()) return;
    const newComment = { id: Date.now().toString(), authorId: mockUser.id, authorName: mockUser.name, text: comment.trim(), createdAt: new Date().toISOString() };
    addComment(pin.id, newComment);
    setComment('');
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this ${pin.title} on REDAT Community Map!`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleNavigate = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${pin.location.latitude},${pin.location.longitude}`,
      android: `geo:0,0?q=${pin.location.latitude},${pin.location.longitude}(${pin.title})`
    });
    Linking.openURL(url).catch(() => Alert.alert('Navigate', 'No mapping app found.'));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg.base }} edges={['top']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], padding: Spacing[4] }}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" accessibilityLabel="Back">
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </Pressable>
        <Text variant="titleMedium" style={{ flex: 1 }}>{cfg.label}</Text>
        {pin.isVerified && <Ionicons name="checkmark-circle" size={20} color={Colors.success} />}
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing[4], gap: Spacing[4], paddingBottom: Spacing[10] }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Category icon */}
        <Card variant="glass">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3], marginBottom: Spacing[3] }}>
            <View style={{ width: 52, height: 52, borderRadius: Radius.xl, backgroundColor: cfg.color + '20', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: cfg.color + '40' }}>
              <Ionicons name={cfg.icon} size={26} color={cfg.color} />
            </View>
            <View style={{ flex: 1 }}>
              <Badge label={cfg.label} color={cfg.color} />
              <Text variant="headlineSmall" style={{ marginTop: 4 }}>{pin.title}</Text>
            </View>
          </View>
          <Text variant="bodyMedium" color={Colors.text.secondary}>{pin.description}</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing[4], paddingTop: Spacing[3], borderTopWidth: 1, borderTopColor: Colors.border.muted }}>
            <View>
              <Text variant="labelSmall" color={Colors.text.tertiary}>Posted by</Text>
              <Text variant="bodySmall">{pin.authorName}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text variant="labelSmall" color={Colors.text.tertiary}>Posted</Text>
              <Text variant="bodySmall">{timeAgo(pin.createdAt)}</Text>
            </View>
          </View>
        </Card>

        {/* Uploaded Image */}
        {pin.images && pin.images.length > 0 && (
          <Card variant="glass" padding={0} style={{ overflow: 'hidden' }}>
            <Image source={{ uri: pin.images[0] }} style={{ width: '100%', height: 200 }} resizeMode="cover" />
          </Card>
        )}

        {/* Actions */}
        <View style={{ flexDirection: 'row', gap: Spacing[3] }}>
          <Pressable onPress={handleLike} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, backgroundColor: Colors.bg.card, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border.default }} accessibilityRole="button" accessibilityLabel={`Like, ${pin.likes} likes`}>
            <Ionicons name="heart" size={18} color={Colors.error} />
            <Text variant="labelMedium" color={Colors.text.primary}>{pin.likes} Likes</Text>
          </Pressable>
          <Pressable onPress={handleShare} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, backgroundColor: Colors.bg.card, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border.default }} accessibilityRole="button">
            <Ionicons name="share-outline" size={18} color={Colors.info} />
            <Text variant="labelMedium" color={Colors.text.primary}>Share</Text>
          </Pressable>
          <Pressable onPress={handleNavigate} style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 12, backgroundColor: Colors.bg.card, borderRadius: Radius.lg, borderWidth: 1, borderColor: Colors.border.default }} accessibilityRole="button">
            <Ionicons name="navigate-outline" size={18} color={Colors.success} />
            <Text variant="labelMedium" color={Colors.text.primary}>Navigate</Text>
          </Pressable>
        </View>

        {/* Voice note */}
        {pin.voiceNoteUrl && (
          <Card variant="glass" padding={Spacing[3]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing[3] }}>
              <Pressable style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center' }} accessibilityRole="button" accessibilityLabel="Play voice note">
                <Ionicons name="play" size={20} color={Colors.white} />
              </Pressable>
              <View style={{ flex: 1 }}>
                <Text variant="labelMedium">Arabic Voice Note</Text>
                <Text variant="caption" color={Colors.text.tertiary}>{pin.voiceTranscript ?? 'Tap to listen'}</Text>
              </View>
            </View>
          </Card>
        )}

        {/* Comments */}
        <View>
          <Text variant="overline" color={Colors.text.tertiary} style={{ marginBottom: Spacing[3] }}>
            COMMENTS ({pin.comments.length})
          </Text>

          {/* Add comment */}
          <View style={{ flexDirection: 'row', gap: Spacing[2], marginBottom: Spacing[3] }}>
            <TextInput
              style={{ flex: 1, backgroundColor: Colors.bg.surface, borderRadius: Radius.md, borderWidth: 1, borderColor: Colors.border.default, paddingHorizontal: 12, paddingVertical: 10, fontFamily: FontFamily.mono, fontSize: FontSize.base, color: Colors.text.primary }}
              placeholder="Add a comment..."
              placeholderTextColor={Colors.text.tertiary}
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <Pressable onPress={handleComment} style={{ width: 44, height: 44, borderRadius: Radius.md, backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center' }} accessibilityRole="button" accessibilityLabel="Post comment">
              <Ionicons name="send" size={18} color={Colors.white} />
            </Pressable>
          </View>

          {pin.comments.map(c => (
            <View key={c.id} style={{ paddingVertical: Spacing[3], borderTopWidth: 1, borderTopColor: Colors.border.muted, gap: 4 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text variant="labelSmall" color={Colors.accent}>{c.authorName}</Text>
                <Text variant="caption" color={Colors.text.tertiary}>{timeAgo(c.createdAt)}</Text>
              </View>
              <Text variant="bodySmall" color={Colors.text.secondary}>{c.text}</Text>
            </View>
          ))}

          {pin.comments.length === 0 && (
            <Text variant="bodySmall" color={Colors.text.tertiary} align="center">No comments yet. Be the first!</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
