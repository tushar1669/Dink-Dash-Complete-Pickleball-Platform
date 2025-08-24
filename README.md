# PickleBay MVP - Premier Pickleball Platform for India

A comprehensive, mobile-first pickleball platform built with Next.js 14, TypeScript, and Tailwind CSS. This MVP focuses on the Delhi NCR market with features for venue booking, tournament participation, equipment shopping, and organizer tools.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:3000`

## ✨ Features Checklist

### Core Features ✅
- [x] **Venue Discovery & Booking**
  - Browse venues with filters (city, date, price, amenities)
  - Real-time slot availability
  - Multi-slot selection and booking
  - Mock payment processing (UPI/Card)
  - Booking confirmation with calendar export (.ics)

- [x] **Tournament Management**
  - Tournament listing with skill-level filtering
  - Event registration with participant tracking
  - Automatic bracket generation (single elimination)
  - Registration management and participant lists

- [x] **Equipment Catalog**
  - Product browsing with advanced filters
  - External purchase links
  - Detailed product information
  - Brand and category organization

- [x] **Organizer Tools**
  - Self-service venue creation wizard
  - Dashboard with booking analytics
  - Automated slot generation
  - Revenue tracking

- [x] **User Profile & Preferences**
  - Skill level and time preferences
  - Booking and registration history
  - Language toggle (English/Hindi)
  - Senior mode accessibility

### Technical Features ✅
- [x] **Accessibility (WCAG 2.2 AA)**
  - Screen reader support
  - Keyboard navigation
  - High contrast ratios
  - Senior mode with larger text
  - Skip links and proper landmarks

- [x] **Internationalization**
  - English/Hindi language support
  - Persistent language preferences
  - Localized currency and date formatting

- [x] **Mobile-First Design**
  - Responsive layouts for all screen sizes
  - Touch-optimized interactions
  - Bottom navigation for mobile
  - Optimized loading states

- [x] **Performance & UX**
  - Framer Motion animations (respects reduced motion)
  - Local storage persistence
  - Optimistic UI updates
  - Progressive loading

## 🏗️ Architecture

### Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Storage:** localStorage (client-side)

### Project Structure
```
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── venues/           # Venue listing & details
│   ├── tournaments/      # Tournament features
│   ├── catalog/          # Equipment catalog
│   ├── profile/          # User profile
│   ├── organizer/        # Organizer dashboard
│   └── docs/             # Flow diagrams
├── components/
│   ├── ui/               # Reusable UI components
│   └── Providers.tsx     # Context providers
├── lib/                  # Utility libraries
│   ├── i18n.tsx         # Internationalization
│   ├── a11y.tsx         # Accessibility context
│   ├── storage.ts       # localStorage helpers
│   └── utils.ts         # Common utilities
├── data/                 # JSON fixtures
└── public/              # Static assets
```

### Data Management
- **Storage:** All data persists in localStorage with namespaced keys
- **Seeding:** Initial data loaded from JSON fixtures on first run
- **State:** React state with localStorage synchronization
- **Types:** Full TypeScript coverage for type safety

## 📊 Data Seeding

The app automatically seeds initial data on first load:

- **5 Cities** (Delhi NCR region)
- **8 Venues** with realistic details
- **40+ Court Slots** for next 7 days
- **10 Tournament Events** with varying skill levels
- **16+ Products** across all categories

### Reset Data
To reset all data and reseed:
```javascript
// In browser console
localStorage.clear();
location.reload();
```

## 🎨 Design System

### Colors
- **Navy:** `#0B1B2B` (primary text, backgrounds)
- **Lime:** `#C8FF5A` (accent, CTAs)
- **Grays:** Tailwind gray palette for neutrals

### Typography
- **Font:** Inter with system fallbacks
- **Hierarchy:** Clear heading levels with proper contrast
- **Senior Mode:** Automatic text size scaling

### Components
- **Cards:** Hover animations with subtle shadows
- **Buttons:** Multiple variants with loading states
- **Forms:** Accessible inputs with proper labeling
- **Navigation:** Responsive header + mobile bottom nav

## 🌐 Internationalization

### Supported Languages
- **English (en):** Default language
- **Hindi (hi):** Full UI translation

### Adding Translations
Edit the dictionary in `lib/i18n.tsx`:
```typescript
const dictionary = {
  en: { 'key': 'English text' },
  hi: { 'key': 'हिंदी पाठ' }
};
```

## ♿ Accessibility Features

### WCAG 2.2 AA Compliance
- **Color Contrast:** 4.5:1 minimum ratio
- **Keyboard Navigation:** Full keyboard support
- **Screen Readers:** Proper ARIA labels and landmarks
- **Focus Management:** Visible focus indicators
- **Touch Targets:** 44px minimum size

### Senior Mode
- Larger text sizes (18px base)
- Increased spacing
- Enhanced contrast
- Simplified interactions

## 🔄 Key User Flows

### Booking Flow
1. Browse venues → Filter → Select venue
2. Choose date → Select time slots → Review
3. Enter contact info → Choose payment → Confirm
4. Booking success → Download calendar file

### Tournament Registration
1. Browse tournaments → Filter by skill level
2. View details → Fill registration form
3. Submit → View in participant list
4. Auto-generate bracket when enough players

### Venue Creation (Organizer)
1. Dashboard → Add venue → Basic info
2. Set details (courts, pricing, amenities)
3. Review → Create → Auto-generate slots

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Environment Variables
No environment variables required for this MVP (all client-side).

### Static Export
The app is configured for static export and can be deployed to any static hosting service.

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] Real authentication system
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Advanced tournament brackets
- [ ] Social features (find players, clubs)
- [ ] Real-time chat
- [ ] Advanced analytics
- [ ] Mobile app (React Native)

### Technical Improvements
- [ ] Server-side rendering optimization
- [ ] Database integration
- [ ] API rate limiting
- [ ] Image optimization
- [ ] PWA features
- [ ] Offline support

## 🐛 Known Limitations

- **Mock Payments:** No real payment processing
- **Local Storage:** Data doesn't sync across devices
- **No Authentication:** All features work without accounts
- **Static Data:** No real-time updates from server
- **Limited Bracket Types:** Only single elimination supported

## 📱 Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+
- **Mobile:** iOS Safari 14+, Chrome Mobile 90+
- **Accessibility:** Screen readers (NVDA, JAWS, VoiceOver)

## 🤝 Contributing

This is an MVP demonstration project. For production use, consider:

1. **Security:** Implement proper authentication
2. **Scalability:** Add database and API layer  
3. **Testing:** Add comprehensive test coverage
4. **Monitoring:** Implement error tracking and analytics
5. **Performance:** Optimize bundle size and loading

## 📄 License

This project is for demonstration purposes. Please ensure proper licensing for production use.

---

**PickleBay MVP** - Zero-drama pickleball: book instantly, compete transparently, belong. 🏓