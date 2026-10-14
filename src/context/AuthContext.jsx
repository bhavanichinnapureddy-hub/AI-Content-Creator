import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CREATORS,
  INITIAL_CUSTOMERS,
  INITIAL_CAMPAIGNS,
  INITIAL_COLLABORATIONS,
  INITIAL_APPLICATIONS,
  INITIAL_REPORTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MESSAGES,
  DEMO_ADMIN
} from '../data/initialData';
import { formatExactLocalTime } from '../utils/timestamps';
import { isAuthorizedAdminEmail } from '../utils/validation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Store user session
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // State for all dynamic marketplace collections
  const [creators, setCreators] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_creators');
      return saved ? JSON.parse(saved) : INITIAL_CREATORS;
    } catch {
      return INITIAL_CREATORS;
    }
  });

  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_customers');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [campaigns, setCampaigns] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_campaigns');
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGNS;
    } catch {
      return INITIAL_CAMPAIGNS;
    }
  });

  const [collaborations, setCollaborations] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_collabs');
      return saved ? JSON.parse(saved) : INITIAL_COLLABORATIONS;
    } catch {
      return INITIAL_COLLABORATIONS;
    }
  });

  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_reports');
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const [savedCampaignIds, setSavedCampaignIds] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_saved_campaigns');
      return saved ? JSON.parse(saved) : ['cmp-1'];
    } catch {
      return ['cmp-1'];
    }
  });

  const [savedCreatorIds, setSavedCreatorIds] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_saved_creators');
      return saved ? JSON.parse(saved) : ['cr-1', 'cr-3'];
    } catch {
      return ['cr-1', 'cr-3'];
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('peacockhub_messages') || localStorage.getItem('creatorsphere_messages');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [adminPassword, setAdminPassword] = useState(() => {
    try {
      return localStorage.getItem('creatorsphere_admin_secret') || DEMO_ADMIN.password;
    } catch {
      return DEMO_ADMIN.password;
    }
  });

  // Demo user credentials registry (for password verification in demo)
  const [registeredAccounts, setRegisteredAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem('contenthub_account_creds');
      if (saved) return JSON.parse(saved);
      // Preload initial accounts with default passwords
      const initCreds = [
        { email: DEMO_ADMIN.email, username: DEMO_ADMIN.username, password: DEMO_ADMIN.password, role: "admin", id: DEMO_ADMIN.id },
        { email: "aria.montgomery@creator.contenthub.io", phone: "9876543210", password: "Password123!", role: "creator", id: "cr-1" },
        { email: "sarah@luminaryaudio.com", phone: "9870011223", password: "Password123!", role: "customer", id: "brand-1" }
      ];
      return initCreds;
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('contenthub_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('contenthub_auth_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_creators', JSON.stringify(creators));
    } catch (e) { console.error(e); }
  }, [creators]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_customers', JSON.stringify(customers));
    } catch (e) { console.error(e); }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_campaigns', JSON.stringify(campaigns));
    } catch (e) { console.error(e); }
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_collabs', JSON.stringify(collaborations));
    } catch (e) { console.error(e); }
  }, [collaborations]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_applications', JSON.stringify(applications));
    } catch (e) { console.error(e); }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_reports', JSON.stringify(reports));
    } catch (e) { console.error(e); }
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_saved_campaigns', JSON.stringify(savedCampaignIds));
    } catch (e) { console.error(e); }
  }, [savedCampaignIds]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_saved_creators', JSON.stringify(savedCreatorIds));
    } catch (e) { console.error(e); }
  }, [savedCreatorIds]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_account_creds', JSON.stringify(registeredAccounts));
    } catch (e) { console.error(e); }
  }, [registeredAccounts]);

  useEffect(() => {
    try {
      localStorage.setItem('contenthub_notifications', JSON.stringify(notifications));
    } catch (e) { console.error(e); }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem('peacockhub_messages', JSON.stringify(messages));
      localStorage.setItem('creatorsphere_messages', JSON.stringify(messages));
    } catch (e) { console.error(e); }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('creatorsphere_admin_secret', adminPassword);
    } catch (e) { console.error(e); }
  }, [adminPassword]);

  useEffect(() => {
    const applyStorage = (key, value) => {
      if (!value) return;
      try {
        const parsed = JSON.parse(value);
        if (key === 'peacockhub_messages' || key === 'creatorsphere_messages') setMessages(parsed);
        if (key === 'contenthub_notifications') setNotifications(parsed);
        if (key === 'contenthub_creators') setCreators(parsed);
        if (key === 'contenthub_customers') setCustomers(parsed);
        if (key === 'contenthub_account_creds') setRegisteredAccounts(parsed);
      } catch {
        /* ignore malformed storage */
      }
    };

    const onStorage = (e) => applyStorage(e.key, e.newValue);
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Authentication Handlers
  const login = (role, identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    // Admin authentication
    if (role === 'admin') {
      const isAdminMatch =
        (cleanId === DEMO_ADMIN.email.toLowerCase() || cleanId === DEMO_ADMIN.username.toLowerCase()) &&
        cleanPass === adminPassword;

      if (!isAdminMatch) {
        throw new Error('Invalid admin credentials. Check the username or Gmail address and password, then try again.');
      }

      const adminUser = {
        id: DEMO_ADMIN.id,
        name: DEMO_ADMIN.name,
        email: DEMO_ADMIN.email,
        username: DEMO_ADMIN.username,
        role: 'admin',
        avatar: DEMO_ADMIN.avatar,
        title: DEMO_ADMIN.title
      };
      setCurrentUser(adminUser);
      return adminUser;
    }

    // Role-specific check against registered credentials
    const accountCred = registeredAccounts.find(acc =>
      acc.role === role &&
      ((acc.email && acc.email.toLowerCase() === cleanId) ||
       (acc.phone && acc.phone === cleanId))
    );

    if (!accountCred) {
      throw new Error(`No ${role} account found matching this email/phone. Please check your credentials or register.`);
    }

    if (accountCred.password !== cleanPass) {
      throw new Error('Incorrect password. Please try again or use Forgot Password.');
    }

    // Retrieve full profile from creators or customers
    if (role === 'creator') {
      const creatorProfile = creators.find(c => c.id === accountCred.id || c.email?.toLowerCase() === cleanId);
      const userObj = creatorProfile || {
        id: accountCred.id,
        name: accountCred.name || 'Unnamed Creator',
        email: accountCred.email,
        phone: accountCred.phone,
        role: 'creator',
        avatar: '',
        category: 'General Lifestyle',
        platform: 'Instagram',
        followers: 12000,
        ratePerPost: 400
      };
      setCurrentUser(userObj);
      return userObj;
    }

    if (role === 'customer') {
      const customerProfile = customers.find(c => c.id === accountCred.id || c.email?.toLowerCase() === cleanId);
      const userObj = customerProfile || {
        id: accountCred.id,
        name: accountCred.name || 'Unnamed Client',
        companyName: accountCred.companyName || 'Business Client',
        email: accountCred.email,
        phone: accountCred.phone,
        role: 'customer',
        avatar: ''
      };
      setCurrentUser(userObj);
      return userObj;
    }

    throw new Error('Unknown authentication role');
  };

  const registerCreator = (data) => {
    const existing = registeredAccounts.find(a =>
      a.email?.toLowerCase() === data.email.toLowerCase() ||
      a.phone === data.phone
    );
    if (existing) {
      throw new Error('An account with this email or mobile number already exists.');
    }

    const newId = `cr-${Date.now()}`;
    const newCreatorProfile = {
      id: newId,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      role: 'creator',
      avatar: '',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
      bio: `Content creator specializing in ${data.category}. Ready to partner with visionary brands.`,
      category: data.category,
      platform: data.platform,
      socialLinks: {
        [data.platform.toLowerCase()]: `@${data.name.toLowerCase().replace(/\s+/g, '')}`
      },
      followers: 5000,
      engagementRate: '4.2%',
      ratePerPost: 350,
      rating: 5.0,
      reviewsCount: 1,
      location: data.location || 'Global',
      verified: false,
      verificationStatus: 'pending',
      status: 'active',
      availability: 'Available for partnerships',
      tags: [data.category, data.platform],
      portfolio: [],
      pricing: [
        { plan: 'Single Sponsored Post', price: 350, deliverable: '1x High-quality Post or Reel' }
      ]
    };

    const newCred = {
      id: newId,
      email: data.email.trim(),
      phone: data.phone.trim(),
      password: data.password,
      role: 'creator',
      name: data.name.trim()
    };

    setRegisteredAccounts(prev => [...prev, newCred]);
    setCreators(prev => [newCreatorProfile, ...prev]);

    // Send notification
    addNotification({
      recipientRole: 'admin',
      recipientId: 'admin',
      title: 'New Creator Joined',
      message: `${data.name} just registered as a ${data.category} creator on CreatorSphere AI.`,
      type: 'admin'
    });

    return newCreatorProfile;
  };

  const registerCustomer = (data) => {
    const existing = registeredAccounts.find(a =>
      a.email?.toLowerCase() === data.email.toLowerCase() ||
      a.phone === data.phone
    );
    if (existing) {
      throw new Error('An account with this email or mobile number already exists.');
    }

    const newId = `brand-${Date.now()}`;
    const newCustomerProfile = {
      id: newId,
      name: data.name.trim(),
      companyName: data.companyName ? data.companyName.trim() : `${data.name.trim()}'s Brand`,
      email: data.email.trim(),
      phone: data.phone.trim(),
      role: 'customer',
      avatar: '',
      bio: `Brand and campaign coordinator at ${data.companyName || data.name}.`,
      location: data.location || 'Global',
      industry: data.businessCategory || 'Brand Marketing',
      status: 'active'
    };

    const newCred = {
      id: newId,
      email: data.email,
      phone: data.phone,
      password: data.password,
      role: 'customer',
      name: data.name,
      companyName: data.companyName
    };

    setRegisteredAccounts(prev => [...prev, newCred]);
    setCustomers(prev => [newCustomerProfile, ...prev]);

    addNotification({
      recipientRole: 'admin',
      recipientId: 'admin',
      title: 'New Brand Customer Registered',
      message: `${data.name} (${data.companyName || 'Individual'}) joined CreatorSphere AI.`,
      type: 'admin'
    });

    return newCustomerProfile;
  };

  const requestPasswordReset = async (email) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      throw new Error('Please enter a valid email address.');
    }

    const account = registeredAccounts.find(
      a => (a.email && a.email.toLowerCase() === cleanEmail)
    ) || (DEMO_ADMIN.email.toLowerCase() === cleanEmail ? DEMO_ADMIN : null);

    if (!account) {
      throw new Error('No registered account found with this email address. Please check your spelling or register.');
    }

    const token = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `tok_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    const tokenRecord = {
      token,
      email: cleanEmail,
      createdAt: new Date().toISOString(),
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes validity
      used: false
    };

    try {
      const existingRaw = localStorage.getItem('creatorsphere_password_reset_tokens');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updated = [...existing.filter(t => t.email !== cleanEmail), tokenRecord];
      localStorage.setItem('creatorsphere_password_reset_tokens', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to store reset token', e);
    }

    const resetLink = `${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(cleanEmail)}`;

    try {
      const response = await fetch('/api/send-reset-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: cleanEmail,
          resetLink,
          subject: 'Password Reset Request – CreatorSphere AI'
        })
      });

      const result = await response.json().catch(() => ({}));

      if (result.delivered) {
        return {
          success: true,
          delivered: true,
          email: cleanEmail,
          message: `A secure password reset link has been sent to ${cleanEmail}. It expires in 15 minutes.`
        };
      }

      return {
        success: true,
        delivered: false,
        email: cleanEmail,
        token,
        resetLink,
        message: result.error
          ? `Reset token created, but email was not sent: ${result.error}`
          : 'A single-use reset link was created (valid 15 minutes). Inbox delivery requires SMTP_HOST, SMTP_USER, and SMTP_PASS in the server .env file.'
      };
    } catch (err) {
      return {
        success: true,
        delivered: false,
        email: cleanEmail,
        token,
        resetLink,
        message: `Reset token created, but the email service could not be reached (${err.message}).`
      };
    }
  };

  const validateResetToken = (token, email) => {
    if (!token) {
      return { valid: false, error: 'Password reset token is missing from the URL or form.' };
    }

    try {
      const existingRaw = localStorage.getItem('creatorsphere_password_reset_tokens');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const record = existing.find(t => t.token === token);

      if (!record) {
        return { valid: false, error: 'Invalid or unrecognized reset token. Please request a new link.' };
      }

      if (record.used) {
        return { valid: false, error: 'This reset token has already been used to change the password.' };
      }

      if (Date.now() > record.expiresAt) {
        return { valid: false, error: 'This reset link has expired (15-minute validity). Please request a new one.' };
      }

      if (email && record.email.toLowerCase() !== email.toLowerCase().trim()) {
        return { valid: false, error: 'Token is associated with a different email address.' };
      }

      return { valid: true, email: record.email };
    } catch {
      return { valid: false, error: 'Failed to access reset token records.' };
    }
  };

  const completePasswordReset = (token, newPassword) => {
    const validation = validateResetToken(token);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    if (!newPassword || newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const cleanEmail = validation.email.toLowerCase();

    if (cleanEmail === DEMO_ADMIN.email.toLowerCase()) {
      setAdminPassword(newPassword);
      try {
        localStorage.setItem('creatorsphere_admin_secret', newPassword);
      } catch (e) {
        console.error(e);
      }
    }

    // Update password in registeredAccounts
    const index = registeredAccounts.findIndex(a => a.email?.toLowerCase() === cleanEmail);
    if (index !== -1) {
      const updatedAccounts = [...registeredAccounts];
      updatedAccounts[index].password = newPassword;
      setRegisteredAccounts(updatedAccounts);
      try {
        localStorage.setItem('contenthub_account_creds', JSON.stringify(updatedAccounts));
      } catch (e) {
        console.error(e);
      }
    }

    // Mark token as used
    try {
      const existingRaw = localStorage.getItem('creatorsphere_password_reset_tokens');
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      const updatedTokens = existing.map(t => t.token === token ? { ...t, used: true, usedAt: new Date().toISOString() } : t);
      localStorage.setItem('creatorsphere_password_reset_tokens', JSON.stringify(updatedTokens));
    } catch (e) {
      console.error(e);
    }

    addNotification({
      recipientRole: 'admin',
      title: 'Security Alert: Password Updated',
      message: `Account credentials updated for ${cleanEmail}.`,
      type: 'admin'
    });

    return true;
  };

  const resetPassword = (email, newPassword) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const index = registeredAccounts.findIndex(a => a.email?.toLowerCase() === cleanEmail);
    if (index === -1) {
      throw new Error('No registered account found with this email address.');
    }

    const updated = [...registeredAccounts];
    updated[index].password = newPassword;
    setRegisteredAccounts(updated);
    try {
      localStorage.setItem('contenthub_account_creds', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('contenthub_auth_user');
  };

  // Profile update
  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);

    if (currentUser.role === 'creator') {
      setCreators(prev => prev.map(c => c.id === currentUser.id ? { ...c, ...updatedData } : c));
    } else if (currentUser.role === 'customer') {
      setCustomers(prev => prev.map(c => c.id === currentUser.id ? { ...c, ...updatedData } : c));
    }
  };

  // Creator Actions
  const toggleSaveCampaign = (campaignId) => {
    setSavedCampaignIds(prev =>
      prev.includes(campaignId) ? prev.filter(id => id !== campaignId) : [...prev, campaignId]
    );
  };

  const applyToCampaign = (campaignId, pitch, proposedRate) => {
    if (!currentUser || currentUser.role !== 'creator') {
      throw new Error('Only creators can apply for campaigns.');
    }
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) throw new Error('Campaign not found');

    const newApp = {
      id: `app-${Date.now()}`,
      campaignId,
      campaignTitle: campaign.title,
      creatorId: currentUser.id,
      creatorName: currentUser.name,
      pitch,
      proposedRate: Number(proposedRate) || campaign.budget,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setApplications(prev => [newApp, ...prev]);

    // Update campaign counter
    setCampaigns(prev => prev.map(c => c.id === campaignId ? { ...c, applicationsCount: (c.applicationsCount || 0) + 1 } : c));

    // Notify brand
    addNotification({
      recipientRole: 'customer',
      recipientId: campaign.brandId,
      title: 'New Application Received',
      message: `${currentUser.name} applied to "${campaign.title}" with proposed budget \$${newApp.proposedRate}.`,
      type: 'application'
    });

    return newApp;
  };

  const respondToCollaboration = (collabId, status) => {
    // status: 'accepted' | 'rejected'
    setCollaborations(prev => prev.map(c => c.id === collabId ? { ...c, status: status === 'accepted' ? 'in-progress' : 'rejected' } : c));
  };

  // Customer / Brand Actions
  const toggleSaveCreator = (creatorId) => {
    setSavedCreatorIds(prev =>
      prev.includes(creatorId) ? prev.filter(id => id !== creatorId) : [...prev, creatorId]
    );
  };

  const createCampaign = (campaignData) => {
    if (!currentUser || currentUser.role !== 'customer') {
      throw new Error('Only brands/customers can create campaigns.');
    }

    const newCamp = {
      id: `cmp-${Date.now()}`,
      brandId: currentUser.id,
      brandName: currentUser.companyName || currentUser.name,
      brandLogo: currentUser.avatar || 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=200&auto=format&fit=crop&q=80',
      title: campaignData.title,
      description: campaignData.description,
      category: campaignData.category,
      platform: campaignData.platform,
      budget: Number(campaignData.budget),
      deadline: campaignData.deadline,
      deliverables: campaignData.deliverables,
      requirements: campaignData.requirements,
      status: 'active',
      applicationsCount: 0,
      spotsAvailable: Number(campaignData.spotsAvailable) || 3,
      tags: campaignData.tags ? campaignData.tags.split(',').map(t => t.trim()) : [campaignData.category]
    };

    setCampaigns(prev => [newCamp, ...prev]);

    addNotification({
      recipientRole: 'creator',
      recipientId: 'all',
      title: 'New Campaign Published',
      message: `${newCamp.brandName} published a new campaign: "${newCamp.title}" with budget \$${newCamp.budget}.`,
      type: 'campaign'
    });

    return newCamp;
  };

  const sendCollaborationRequest = ({ creatorId, campaignId, amount, deliverable, dueDate, notes }) => {
    const creator = creators.find(c => c.id === creatorId);
    const campaign = campaigns.find(c => c.id === campaignId);

    const newCollab = {
      id: `collab-${Date.now()}`,
      campaignId: campaignId || 'direct-invite',
      campaignTitle: campaign ? campaign.title : 'Direct Partnership Project',
      brandId: currentUser.id,
      brandName: currentUser.companyName || currentUser.name,
      creatorId,
      creatorName: creator ? creator.name : 'Creator',
      amount: Number(amount),
      status: 'pending',
      deliverable,
      dueDate,
      notes
    };

    setCollaborations(prev => [newCollab, ...prev]);

    addNotification({
      recipientRole: 'creator',
      recipientId: creatorId,
      title: 'New Collaboration Invitation 🚀',
      message: `${currentUser.companyName || currentUser.name} sent you a collaboration request for \$${amount}.`,
      type: 'collab'
    });

    return newCollab;
  };

  // Admin Actions
  const verifyCreator = (creatorId, approved) => {
    setCreators(prev => prev.map(c => {
      if (c.id === creatorId) {
        return {
          ...c,
          verified: approved,
          verificationStatus: approved ? 'approved' : 'rejected'
        };
      }
      return c;
    }));

    addNotification({
      recipientRole: 'creator',
      recipientId: creatorId,
      title: approved ? 'Verification Approved! 🎉' : 'Verification Update',
      message: approved ? 'Your profile has received the CreatorSphere AI Verified Creator badge.' : 'Your creator verification was not approved at this time.',
      type: 'verification'
    });
  };

  const toggleAccountStatus = (id, role) => {
    if (role === 'creator') {
      setCreators(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'suspended' ? 'active' : 'suspended' } : c));
    } else if (role === 'customer') {
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'suspended' ? 'active' : 'suspended' } : c));
    }
  };

  const deleteCampaign = (campaignId) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
  };

  const resolveReport = (reportId, resolution) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: resolution } : r));
  };

  const formatCurrentTime = () => {
    return new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const addNotification = (notif) => {
    const nowIso = new Date().toISOString();
    const nowFormatted = formatCurrentTime();
    const item = {
      ...notif,
      id: notif.id || `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: notif.createdAt || nowIso,
      timestamp: notif.timestamp || nowFormatted,
      read: notif.read ?? false
    };
    setNotifications(prev => [item, ...prev]);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const sendMessage = ({ recipientId, recipientName, recipientRole, text, requestType = 'general_message' }) => {
    const nowIso = new Date().toISOString();
    const nowFormatted = formatCurrentTime();
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      senderId: currentUser?.id || 'guest',
      senderName: currentUser?.name || 'User',
      senderRole: currentUser?.role || 'creator',
      recipientId: recipientId || 'admin-root',
      recipientName: recipientName || 'Alexander Vance',
      recipientRole: recipientRole || 'admin',
      text,
      createdAt: nowIso,
      timestamp: nowFormatted,
      requestType,
      status: currentUser?.role === 'admin' || requestType === 'conversation' ? 'Delivered' : 'Pending',
      read: false
    };
    setMessages(prev => {
      const duplicate = prev.some(m =>
        m.senderId === newMsg.senderId &&
        m.recipientId === newMsg.recipientId &&
        m.text === newMsg.text &&
        Math.abs(new Date(m.createdAt || 0).getTime() - Date.now()) < 1500
      );
      if (duplicate) return prev;
      return [newMsg, ...prev];
    });

    // Push notification to recipient
    addNotification({
      recipientRole: newMsg.recipientRole,
      recipientId: newMsg.recipientId,
      title: `New Message from ${newMsg.senderName}`,
      message: text.slice(0, 100),
      type: 'message',
      createdAt: nowIso,
      timestamp: nowFormatted
    });

    return newMsg;
  };

  const approveRequest = (messageId) => {
    setMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        addNotification({
          recipientRole: m.senderRole,
          recipientId: m.senderId,
          title: 'Request Approved! ✅',
          message: `Your request "${m.text.slice(0, 60)}..." has been approved by Platform Admin.`,
          type: 'admin'
        });
        return { ...m, status: 'Approved', read: true };
      }
      return m;
    }));
  };

  const rejectRequest = (messageId) => {
    setMessages(prev => prev.map(m => {
      if (m.id === messageId) {
        addNotification({
          recipientRole: m.senderRole,
          recipientId: m.senderId,
          title: 'Request Status Update ❌',
          message: `Your request "${m.text.slice(0, 60)}..." was reviewed and declined by Platform Admin.`,
          type: 'admin'
        });
        return { ...m, status: 'Rejected', read: true };
      }
      return m;
    }));
  };

  const deleteUser = (userId, role) => {
    if (role === 'creator') {
      setCreators(prev => prev.filter(c => c.id !== userId));
    } else if (role === 'customer') {
      setCustomers(prev => prev.filter(c => c.id !== userId));
    }
    setRegisteredAccounts(prev => prev.filter(a => a.id !== userId));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        registerCreator,
        registerCustomer,
        resetPassword,
        requestPasswordReset,
        validateResetToken,
        completePasswordReset,
        logout,
        updateProfile,

        // Data collections
        creators,
        customers,
        campaigns,
        collaborations,
        applications,
        reports,
        savedCampaignIds,
        savedCreatorIds,
        notifications,
        registeredAccounts,
        messages,

        // Handlers
        toggleSaveCampaign,
        applyToCampaign,
        respondToCollaboration,
        toggleSaveCreator,
        createCampaign,
        sendCollaborationRequest,
        verifyCreator,
        toggleAccountStatus,
        deleteCampaign,
        deleteUser,
        resolveReport,
        addNotification,
        markAllNotificationsAsRead,
        sendMessage,
        approveRequest,
        rejectRequest,
        formatCurrentTime
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
