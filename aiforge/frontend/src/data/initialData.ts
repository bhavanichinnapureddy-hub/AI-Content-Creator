import { CreatorProfileData, BriefData, EngagementData, VerificationRequestItem, WalletTransactionItem } from '../types/marketplace';

export const INITIAL_CREATORS: CreatorProfileData[] = [
  {
    id: "creator-1",
    userId: "user-creator-1",
    displayName: "Alex Vance",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    headline: "Senior AI Filmmaker & Sci-Fi Commercial Director",
    bio: "Pioneering cinematic visual storytelling with Runway Gen-3 Alpha, ComfyUI, and custom LoRA pipelines. Directed AI spots for future-tech startups, gaming teasers, and luxury fragrance concepts.",
    specialization: "AI Filmmaker",
    skills: ["Gen-3 Alpha", "Prompt Engineering", "Color Grading", "Sound Design", "Camera Motion Control", "VFX Integration"],
    aiTools: ["Runway Gen-3", "Midjourney v6", "Premiere Pro", "Kling AI", "Magnific AI"],
    workflowDesc: "Ideation & Scripting -> Midjourney Keyframe Character Bible -> Runway Camera Conditioning & Multi-Motion Brush -> Premiere soundscape sync & 4K upscaling.",
    location: "Los Angeles, CA (Remote)",
    languages: ["English", "Spanish"],
    availability: true,
    priceRangeMin: 1200,
    priceRangeMax: 4500,
    experienceLevel: "Senior",
    responseTimeDays: 1,
    rating: 4.98,
    reviewsCount: 38,
    completedProjects: 34,
    isVerified: true,
    verifiedTool: true,
    verifiedWorkflow: true,
    verifiedPastWork: true,
    portfolio: [
      {
        id: "port-101",
        title: "Chronos: Quantum Chronometer Commercial",
        description: "A 25-second cinematic luxury ad featuring an ethereal timepiece floating through nebular particles and crystal architectures.",
        thumbnailUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80",
        mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
        contentType: "Ad",
        aiToolsUsed: ["Runway Gen-3", "Midjourney v6", "Magnific AI"],
        workflowSteps: [
          { step: "Prompt Design", desc: "Crafted 80+ prompt iterations for consistent sapphire crystal refractions." },
          { step: "Motion Synthesis", desc: "Runway Gen-3 with custom pan & macro orbit motion brushes." },
          { step: "Post & Sound", desc: "4K AI remastering + Dolby 5.1 ambient synth soundtrack." }
        ],
        aspectRatio: "16:9",
        durationSeconds: 25,
        isCommercialUse: true,
        tags: ["Luxury", "Commercial", "Sci-Fi", "Watches"],
        verifiedTool: true,
        verifiedWorkflow: true,
        verifiedPastWork: true,
        createdAt: "2026-08-15"
      },
      {
        id: "port-102",
        title: "Cyberpunk Tokyo 2088 Teaser",
        description: "Spec narrative short showcasing photorealistic neon reflections, robotic street vendors, and rainy aerial cityscapes.",
        thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
        mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-sunset-26070-large.mp4",
        contentType: "Short Film",
        aiToolsUsed: ["Kling AI", "Flux.1", "Topaz Video AI"],
        workflowSteps: [
          { step: "Character Lock", desc: "FaceID consistency pipeline using ComfyUI IP-Adapter." },
          { step: "Atmospheric Render", desc: "Kling camera push-in with dynamic volumetric mist." }
        ],
        aspectRatio: "16:9",
        durationSeconds: 40,
        isCommercialUse: true,
        tags: ["Cyberpunk", "Narrative", "Cinematic"],
        verifiedTool: true,
        verifiedWorkflow: true,
        verifiedPastWork: false,
        createdAt: "2026-09-02"
      }
    ]
  },
  {
    id: "creator-2",
    userId: "user-creator-2",
    displayName: "Elena Rostova",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    headline: "Generative Motion Designer & 3D Product Animator",
    bio: "Specializing in procedural generative animations, fluid simulation neural passes, and hypnotic packaging reveals for beverage, cosmetics, and lifestyle brands.",
    specialization: "AI Animator",
    skills: ["ComfyUI", "Animatediff", "Blender Neural Passes", "Stable Diffusion XL", "TouchDesigner"],
    aiTools: ["ComfyUI", "Animatediff", "Stable Diffusion", "After Effects", "Blender"],
    workflowDesc: "Blender 3D depth/normal map extraction -> ComfyUI Animatediff multi-pass rendering -> AE compositing & color pass.",
    location: "Berlin, Germany (Remote)",
    languages: ["English", "German", "Russian"],
    availability: true,
    priceRangeMin: 900,
    priceRangeMax: 3200,
    experienceLevel: "Senior",
    responseTimeDays: 1,
    rating: 5.0,
    reviewsCount: 42,
    completedProjects: 42,
    isVerified: true,
    verifiedTool: true,
    verifiedWorkflow: true,
    verifiedPastWork: true,
    portfolio: [
      {
        id: "port-201",
        title: "Aura Botanica Bio-Serum Reveal",
        description: "Botanical generative animation tracking organic rose petals morphing into glowing micro-droplets of luxury skin serum.",
        thumbnailUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
        mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-in-slow-motion-42998-large.mp4",
        contentType: "3D Animation",
        aiToolsUsed: ["ComfyUI", "Animatediff", "Blender"],
        workflowSteps: [
          { step: "Geometry Base", desc: "3D bottle turn in Blender as motion control guide." },
          { step: "Neural Morph", desc: "Animatediff SDXL with floral latent checkpoints." }
        ],
        aspectRatio: "9:16",
        durationSeconds: 15,
        isCommercialUse: true,
        tags: ["Skincare", "Motion Design", "Luxury", "Vertical Ad"],
        verifiedTool: true,
        verifiedWorkflow: true,
        verifiedPastWork: true,
        createdAt: "2026-07-28"
      }
    ]
  },
  {
    id: "creator-3",
    userId: "user-creator-3",
    displayName: "Marcus Chen",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    headline: "Lead Prompt Architect & Generative Brand Designer",
    bio: "Translating brand identities into infallible neural style books. Ex-creative agency lead who now constructs hyper-consistent generative art directions for Global 500 brands.",
    specialization: "Generative Designer",
    skills: ["Flux.1 Dev", "Midjourney Style References", "LoRA Fine-tuning", "Vector Tracing", "Brand Systems"],
    aiTools: ["Flux.1", "Midjourney v6", "Magnific AI", "Photoshop", "Illustrator"],
    workflowDesc: "Brand moodboard extraction -> Custom style-reference weights -> Seed locked high-res generation -> Vector touchups.",
    location: "Singapore (Remote)",
    languages: ["English", "Mandarin"],
    availability: true,
    priceRangeMin: 800,
    priceRangeMax: 2800,
    experienceLevel: "Expert",
    responseTimeDays: 1,
    rating: 4.95,
    reviewsCount: 31,
    completedProjects: 29,
    isVerified: true,
    verifiedTool: true,
    verifiedWorkflow: true,
    verifiedPastWork: false,
    portfolio: [
      {
        id: "port-301",
        title: "Volt Motors: 2027 Concept Hypercar Campaign",
        description: "Set of 12 hyper-detailed architectural & outdoor campaign visuals rendered in 8K with zero hallucinated anomalies.",
        thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
        mediaUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop&q=80",
        contentType: "Product Video",
        aiToolsUsed: ["Flux.1 Dev", "Magnific AI", "Photoshop"],
        workflowSteps: [
          { step: "Design Lock", desc: "Constructed consistent CAD-matched front and profile aesthetics." },
          { step: "Lighting", desc: "Cinematic sunset raytracing prompts with physical optics." }
        ],
        aspectRatio: "16:9",
        durationSeconds: 0,
        isCommercialUse: true,
        tags: ["Automotive", "Key Visuals", "Hypercar"],
        verifiedTool: true,
        verifiedWorkflow: true,
        verifiedPastWork: true,
        createdAt: "2026-09-11"
      }
    ]
  },
  {
    id: "creator-4",
    userId: "user-creator-4",
    displayName: "Maya Lindqvist",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    headline: "AI Character Designer & Virtual Influencer Stylist",
    bio: "Crafting permanent virtual brand ambassadors, consistent game characters, and AI fashion lookbooks with 100% facial and anatomical preservation.",
    specialization: "AI Character Designer",
    skills: ["IP-Adapter", "InstantID", "FaceID ComfyUI", "Clo3D AI Integration", "Fashion Styling"],
    aiTools: ["ComfyUI", "Stable Diffusion", "Midjourney", "Photoshop"],
    workflowDesc: "Face embeddings clustering -> Custom garment texture conditioning -> ControlNet openpose guidance -> Final texture bake.",
    location: "Stockholm, Sweden",
    languages: ["English", "Swedish"],
    availability: true,
    priceRangeMin: 700,
    priceRangeMax: 2400,
    experienceLevel: "Mid-Level",
    responseTimeDays: 2,
    rating: 4.9,
    reviewsCount: 19,
    completedProjects: 18,
    isVerified: true,
    verifiedTool: true,
    verifiedWorkflow: false,
    verifiedPastWork: true,
    portfolio: [
      {
        id: "port-401",
        title: "Kira: Cyber-Athleisure Brand Ambassador",
        description: "Consistent virtual human model in 20 athletic poses and high-fashion urban environments across Milan and Seoul.",
        thumbnailUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
        mediaUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80",
        contentType: "Character Design",
        aiToolsUsed: ["ComfyUI", "InstantID", "Flux"],
        workflowSteps: [
          { step: "Face Identity", desc: "Synthesized biometric identity vector for absolute face locking." }
        ],
        aspectRatio: "9:16",
        durationSeconds: 0,
        isCommercialUse: true,
        tags: ["Virtual Human", "Fashion", "Character Design"],
        verifiedTool: true,
        verifiedWorkflow: true,
        verifiedPastWork: true,
        createdAt: "2026-08-30"
      }
    ]
  },
  {
    id: "creator-5",
    userId: "user-creator-5",
    displayName: "Liam O'Connor",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    headline: "AI Video Editor & Viral Short-Form Content Producer",
    bio: "Fast-turnaround high-retention AI TikToks, Reels, and YouTube Shorts for D2C brands. Specialists in AI B-roll generation and generative audio voiceovers.",
    specialization: "AI Video Editor",
    skills: ["CapCut AI", "Runway Gen-3", "ElevenLabs", "Pika Labs", "Retention Editing"],
    aiTools: ["Runway", "ElevenLabs", "Pika 1.5", "CapCut Pro"],
    workflowDesc: "Competitor trend scan -> Viral script generation -> ElevenLabs emotional voice synthesis -> AI visual montage.",
    location: "Dublin, Ireland",
    languages: ["English"],
    availability: true,
    priceRangeMin: 450,
    priceRangeMax: 1500,
    experienceLevel: "Senior",
    responseTimeDays: 1,
    rating: 4.92,
    reviewsCount: 56,
    completedProjects: 52,
    isVerified: true,
    verifiedTool: true,
    verifiedWorkflow: true,
    verifiedPastWork: true,
    portfolio: [
      {
        id: "port-501",
        title: "Energy Drink TikTok Viral UGC Ad Series",
        description: "High-octane 15-second vertical campaign pairing hyper-speed generative action cuts with voiceover retention hooks.",
        thumbnailUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
        mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-glowing-light-bulb-41551-large.mp4",
        contentType: "Ad",
        aiToolsUsed: ["Pika 1.5", "ElevenLabs", "CapCut"],
        workflowSteps: [
          { step: "Viral Hooking", desc: "First 2 seconds designed with extreme visual curiosity." }
        ],
        aspectRatio: "9:16",
        durationSeconds: 15,
        isCommercialUse: true,
        tags: ["Viral", "Shorts", "Reels", "Energy Drink"],
        verifiedTool: true,
        verifiedWorkflow: false,
        verifiedPastWork: true,
        createdAt: "2026-09-20"
      }
    ]
  }
];

export const INITIAL_BRIEFS: BriefData[] = [
  {
    id: "brief-1",
    brandProfileId: "brand-1",
    brandName: "Aetheria Smart Wearables",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80",
    title: "20-Second Futuristic Commercial for ChronoSync Smart Ring",
    campaignGoal: "Drive pre-orders for our titanium biometric smart ring with an ethereal, high-end Apple-meets-Blade-Runner aesthetic.",
    contentType: "Ad",
    creativeStyle: "Minimalist Sci-Fi, Dark Luxe, Micro-reflections",
    aspectRatio: "9:16",
    durationSeconds: 20,
    deliverableCount: 2,
    budgetMin: 1500,
    budgetMax: 3000,
    deadline: "2026-11-05",
    targetAudience: "Tech executives, biohackers, luxury lifestyle enthusiasts aged 25-45.",
    language: "English",
    description: "We require a 20-second cinematic vertical video and one 16:9 master cut showing our biometric ring tracking pulse, sleep waves, and neural flow with glowing optical particles.",
    dos: ["Use seamless smooth camera motions", "Highlight titanium brushed metallic texture", "Subtle neon glowing data points"],
    donts: ["No cartoonish or low-resolution hands", "No distorted geometric shapes"],
    commercialUseType: "Full Worldwide Digital Rights (Social & Paid Ads)",
    aiDisclosureRequired: true,
    requiredFormats: ["4K MP4 (ProRes available)", "H.264 9:16", "H.264 16:9"],
    requiredSkills: ["Runway Gen-3", "ComfyUI", "Sound Design"],
    requiredTools: ["Runway Gen-3", "Premiere Pro"],
    status: "PUBLISHED",
    isAiGenerated: true,
    applicantCount: 4,
    createdAt: "2026-10-01"
  },
  {
    id: "brief-2",
    brandProfileId: "brand-2",
    brandName: "Lumina Organic Skincare",
    brandLogo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&auto=format&fit=crop&q=80",
    title: "Generative Micro-World 3D Animation for Hydration Serum",
    campaignGoal: "Showcase the cellular absorption of our hyaluronic formula via hypnotic generative fluid simulation.",
    contentType: "3D Animation",
    creativeStyle: "Organic Macro, Glass & Water, Pastel Radiance",
    aspectRatio: "1:1",
    durationSeconds: 15,
    deliverableCount: 1,
    budgetMin: 1000,
    budgetMax: 2200,
    deadline: "2026-10-28",
    targetAudience: "Clean beauty consumers and skincare enthusiasts on Instagram.",
    language: "English",
    description: "A 15-second loopable square video depicting water droplets morphing into micro botanicals that nourish glowing skin tissue.",
    dos: ["Ultra clean studio lighting", "Natural water refraction and dew drops"],
    donts: ["No unnatural human skin artifacts", "No jittery frame transitions"],
    commercialUseType: "Digital Organic Social Only",
    aiDisclosureRequired: false,
    requiredFormats: ["4K Square MP4"],
    requiredSkills: ["Animatediff", "ComfyUI", "Fluid Dynamics"],
    requiredTools: ["ComfyUI", "After Effects"],
    status: "PUBLISHED",
    isAiGenerated: false,
    applicantCount: 2,
    createdAt: "2026-10-04"
  }
];

export const INITIAL_ENGAGEMENTS: EngagementData[] = [
  {
    id: "eng-1",
    briefId: "brief-1",
    briefTitle: "20-Second Futuristic Commercial for ChronoSync Smart Ring",
    brandName: "Aetheria Smart Wearables",
    brandUserId: "user-brand-1",
    creatorId: "creator-1",
    creatorName: "Alex Vance",
    creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    status: "DRAFT_SUBMITTED",
    agreedBudget: 2400,
    deadline: "2026-11-05",
    revisionCount: 1,
    maxRevisions: 3,
    escrowStatus: "IN_ESCROW",
    licenseType: "Full Commercial Paid Advertising License",
    createdAt: "2026-10-05",
    messages: [
      {
        id: "msg-1",
        senderId: "user-brand-1",
        senderName: "Aetheria Brand Director",
        senderRole: "BRAND",
        content: "Hi Alex! Super excited to have you on board. We loved your Chronos spec piece. Attached our 3D CAD references.",
        createdAt: "2026-10-05 10:15"
      },
      {
        id: "msg-2",
        senderId: "user-creator-1",
        senderName: "Alex Vance",
        senderRole: "CREATOR",
        content: "Thanks! I've loaded the CAD into our depth-conditioning pipeline. First draft sequence uploaded below for review.",
        createdAt: "2026-10-08 16:40"
      }
    ],
    files: [
      {
        id: "file-1",
        filename: "ChronoSync_Draft_v1_RoughCut.mp4",
        fileUrl: "https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4",
        fileSize: "48.2 MB",
        version: 1,
        isDraft: true,
        isFinal: false,
        createdAt: "2026-10-08"
      }
    ]
  }
];

export const INITIAL_VERIFICATIONS: VerificationRequestItem[] = [
  {
    id: "verif-1",
    creatorId: "creator-4",
    creatorName: "Maya Lindqvist",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
    type: "WORKFLOW_AUTHENTICITY",
    status: "PENDING",
    proofUrl: "https://github.com/maya-neural/comfyui-faceid-workflow",
    proofDescription: "Attached JSON workflow node graphs and screen recording demonstrating live IP-Adapter character consistency generations.",
    createdAt: "2026-10-09"
  },
  {
    id: "verif-2",
    creatorId: "creator-3",
    creatorName: "Marcus Chen",
    creatorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
    type: "PAST_CLIENT_WORK",
    status: "PENDING",
    proofUrl: "https://behance.net/marcuschen-generative",
    proofDescription: "Client invoice and NDA sign-off for Volt Motors automotive campaign.",
    createdAt: "2026-10-10"
  }
];

export const INITIAL_TRANSACTIONS: WalletTransactionItem[] = [
  {
    id: "tx-1",
    amount: 5000,
    type: "DEPOSIT",
    description: "Added funds via Demo Card •••• 4242",
    date: "2026-10-02",
    status: "COMPLETED"
  },
  {
    id: "tx-2",
    amount: -2400,
    type: "ESCROW",
    description: "Escrow locked for Brief 'ChronoSync Smart Ring'",
    date: "2026-10-05",
    status: "COMPLETED"
  }
];
