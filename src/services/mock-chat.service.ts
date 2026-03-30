import { Injectable } from '@angular/core';

/**
 * Sahal AI Assistant
 * Provides intelligent chatbot responses about the marketplace app
 * Created by: Anas Salah
 * Responds in both English and Somali
 */
@Injectable({
  providedIn: 'root'
})
export class MockChatService {
  private mockResponses: { [key: string]: string } = {
    // APP INFORMATION - English
    'who created': 'This app was created by Anas Salah! 👨‍💻 He built Sahal Marketplace to make buying and selling easier for everyone.',
    'who is anas salah': 'Anas Salah is the creator of Sahal Marketplace! 🎉 He developed this platform to connect buyers and sellers in the community.',
    'creator': 'Sahal Marketplace was created by Anas Salah! 👨‍💻',
    'about': 'Welcome to Sahal Marketplace! 🎯 Created by Anas Salah, this is a platform where you can:\n- Browse and buy items\n- Sell your own items\n- Chat with buyers/sellers\n- Get AI assistance\n\nEnjoy your shopping experience! 😊',
    'what is sahal': 'Sahal Marketplace is a modern classifieds platform created by Anas Salah! 🏪 It connects buyers and sellers in your community. Buy low, sell high, and enjoy hassle-free transactions!',
    
    // FEATURES - English
    'features': 'Sahal Marketplace offers:\n✅ Browse thousands of listings\n✅ Create and manage your own listings\n✅ Real-time chat with other users\n✅ AI-powered chat assistance\n✅ Categories for easy browsing\n✅ Notifications for updates\n✅ User profiles\n\nCreated by Anas Salah! 👨‍💻',
    'how to use': 'Using Sahal Marketplace:\n1. Browse items in categories\n2. Click on items to see details\n3. Chat with sellers to negotiate\n4. Create listings to sell your items\n5. Manage your profile\n\nThat\'s it! 🎉',
    
    // MARKETPLACE - English
    'price': 'I can help with pricing! Tell me:\n- What item are you selling/buying?\n- What category is it in?\n- What condition is it in?\n\nAnd I\'ll give you pricing suggestions!',
    'listing': 'To create a listing:\n1. Click "Ku dar Xayeysiin" (Add Listing)\n2. Upload clear photos\n3. Add title and description\n4. Set your price\n5. Include location\n\nThat\'s it! 🎉',
    'sell': 'To sell on Sahal Marketplace:\n1. Click "Ku dar Xayeysiin" (Add Listing)\n2. Add photos of your item\n3. Write a clear description\n4. Set a competitive price\n5. Include your location\n6. Wait for buyers to contact you!\n\nHappy selling! 💰',
    'buy': 'To buy on Sahal Marketplace:\n1. Browse items by category\n2. Click on items you like\n3. Check reviews and seller info\n4. Chat with the seller\n5. Negotiate if needed\n6. Complete the transaction\n\nEnjoy your purchase! 🛍️',
    
    // CHAT & HELP - English
    'hello': 'Hello! 👋 I\'m Sahal AI Assistant, created by Anas Salah. How can I help you today?',
    'hi': 'Hi there! 👋 I\'m here to assist you on Sahal Marketplace!',
    'help': 'I can help you with:\n- About the app and Anas Salah\n- Finding items\n- Creating listings\n- Price guidance\n- Buying and selling tips\n- General marketplace questions\n\nWhat would you like to know?',
    'thanks': 'You\'re welcome! Made possible by Anas Salah\'s vision! 😊',
    'bye': 'Goodbye! See you soon on Sahal Marketplace! 👋',
    
    // SOMALI - APP INFORMATION
    'yaa sameeye': 'App-ka Sahal Marketplace waxaa sameeye Anas Salah! 👨‍💻 Wuxuu u sameeyey inay qoraalo iyo iibinta u fududaato qofka kasta.',
    'anas salah': 'Anas Salah waa is-abuuritye Sahal Marketplace! 🎉 Wuxuu sameeyey platform-ka inaad isku xidhno iibiyayaasha iyo kaybinta.',
    'waxa waye': 'Sahal Marketplace waxaa sameeye Anas Salah! 🏪 Platform-ka waa meelo ay isku xidhaan cajiil iyo iibiyayaasha. Iib hoose, iibso sare, oo ku faarax! 😊',
    
    // SOMALI - FEATURES
    'features-so': 'Sahal Marketplace waxaa leh:\n✅ Qeybo badan oo xayeysii ay la brow gaareysiin\n✅ Ku dar listing-yo tiisa\n✅ Chat live ah\n✅ AI assistance\n✅ Categories\n✅ Notifications\n✅ User profiles\n\nSameeye Anas Salah! 👨‍💻',
    'sidee loo isticmaalo': 'Sahal Marketplace-ka isticmaalka:\n1. Xayeysii radi categories\n2. Click item-ka\n3. Chat iibiyahaa\n4. Ku dar listing-yo\n5. Manage profile-ka\n\nYuu dhammaadey! 🎉',
    
    // SOMALI - MARKETPLACE
    'iibsiga': 'Sahal Marketplace-ka iibsiga:\n1. Click "Iib"\n2. Sawir ku dar\n3. Qaab lagu qoro\n4. Qiimo set\n5. Location\n6. Orod kabii!\n\nGuulayso cajiilka! 🛍️',
    'iibinta': 'Sahal Marketplace-ka iibinta:\n1. Click "Ku dar Xayeysiin"\n2. Sawir nadiif ah\n3. Qaab iyo tilmaan\n4. Qiimo heshii\n5. Location\n6. Orod iska dhamaade!\n\nGuulayso iibinta! 💰',
    'qiimo': 'Waxaan ku caawi karaa qiimaha! Ii sheeg:\n- Maxaa aad iibinayso?\n- Category-ga?\n- Xaalada?\n\nWaxaan qiimo heshii siin doonaa!',
    
    // SOMALI - CHAT & HELP
    'salam': 'Salaam! 👋 Aninaa Sahal AI Assistant, Anas Salah sameeye. Sidee ayaan kuu caawi karaa?',
    'iska warran': 'Waxaan ku caawi karaa:\n- App-ka iyo Anas Salah\n- Xayeysii raadinta\n- Listing-ku abuurista\n- Qiimo heshiinta\n- Iib iyo kaybinta\n- Su\'aalashada kasida\n\nMaxaa aad rabta?',
    'mahadsanid': 'Adna walaalo! Anas Salah ayaa waxyado yaas soo caddaystay! 😊',
    'baari': 'Noo barihii! Waxaan ku aragno Sahal Marketplace-ka! 👋',
  };

  async *sendMessageStream(message: string): AsyncGenerator<string> {
    const lowerMessage = message.toLowerCase().trim();
    let response = '';

    // Find matching response
    for (const [key, value] of Object.entries(this.mockResponses)) {
      if (lowerMessage.includes(key)) {
        response = value;
        break;
      }
    }

    // If no match, give a generic response
    if (!response) {
      response = this.getGenericResponse(message);
    }

    // Stream the response character by character
    for (const char of response) {
      yield char;
      // Small delay for streaming effect
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  }

  private getGenericResponse(message: string): string {
    const responses = [
      'That\'s a great question! 🤔 I\'m Sahal AI Assistant, created by Anas Salah. Can you tell me more about what you\'re looking for?',
      'Interesting! 😊 I can help with:\n- App info and Anas Salah\n- Finding items\n- Creating listings\n- Price guidance\n- General marketplace info',
      'I understand! 👍 Would you like to:\n- Learn about the app?\n- Browse items?\n- Create a listing?\n- Chat about pricing?',
      'Su\'aa fiican! 🤔 Waxaan caawi karaa:\n- App-ka iyo Anas Salah\n- Xayeysii raadinta\n- Listing-ku abuurista\n- Qiimo heshiinta',
      'Waxaa iska mid ah! 👍 Anas Salah sameeye app-ka. Wala gaaban:\n- App-ka radi?\n- Xayeysii raadi?\n- Listing-ka abuur?\n- Qiimo ku hadal?',
      'Thanks for asking! 😊 This app was created by Anas Salah to make marketplace easier. How else can I help?',
      'Mahadsanid su\'uu! 😊 Anas Salah waa u sameeyey app-ka. Maxad kale oo aad jeclaan lahayd?'
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }
}
