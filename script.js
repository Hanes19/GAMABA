// GAMABA Digital Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initCarousel();
    initAnimations();
    initVideoControls();
    initNetiquetteModal();
    initReflectionsModal();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced carousel functionality
function initCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    
    // Auto-advance carousel every 8 seconds
    setInterval(() => {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.next();
        }
    }, 8000);
    
    // Pause carousel on hover
    carousel.addEventListener('mouseenter', function() {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.pause();
        }
    });
    
    // Resume carousel on mouse leave
    carousel.addEventListener('mouseleave', function() {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.cycle();
        }
    });
}

// Scroll animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card, .netiquette-card, .video-info, .brochure-wrapper');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Video controls and functionality
function initVideoControls() {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;
    
    // Handle local video player
    const video = videoContainer.querySelector('video');
    if (video) {
        // Add loading state to video
        video.addEventListener('loadstart', function() {
            this.style.opacity = '0.7';
        });
        
        video.addEventListener('canplay', function() {
            this.style.opacity = '1';
        });
        
        video.style.transition = 'opacity 0.3s ease';
        
        // Add custom play button overlay
        const playButton = document.createElement('div');
        playButton.className = 'video-play-overlay';
        playButton.innerHTML = '<i class="fas fa-play fa-3x"></i>';
        playButton.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: white;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
            background: rgba(0,0,0,0.5);
            border-radius: 50%;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        videoContainer.style.position = 'relative';
        videoContainer.appendChild(playButton);
        
        playButton.addEventListener('click', function() {
            video.play();
            this.style.opacity = '0';
            this.style.pointerEvents = 'none';
        });
        
        // Hide play button when video is playing
        video.addEventListener('play', function() {
            playButton.style.opacity = '0';
            playButton.style.pointerEvents = 'none';
        });
        
        // Show play button when video is paused
        video.addEventListener('pause', function() {
            playButton.style.opacity = '1';
            playButton.style.pointerEvents = 'auto';
        });
    }
    
    // Handle iframe fallback (YouTube embed)
    const iframe = videoContainer.querySelector('iframe');
    if (iframe) {
        iframe.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        iframe.style.opacity = '0';
        iframe.style.transition = 'opacity 0.3s ease';
    }
}

// Netiquette modal functionality
function initNetiquetteModal() {
    // Create individual modals for each netiquette guideline
    const modalsHTML = `
        <!-- Respect Others Modal -->
        <div class="modal fade" id="respectModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-handshake me-2"></i>Respect Others
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Core Principles:</h6>
                        <ul>
                            <li>Always treat fellow students, teachers, and online community members with respect and kindness</li>
                            <li>Use appropriate language and tone in all communications</li>
                            <li>Avoid offensive, discriminatory, or inflammatory remarks</li>
                            <li>Respect different opinions, perspectives, and learning styles</li>
                            <li>Be patient with others' learning pace and understanding</li>
                            <li>Listen actively and respond thoughtfully to others' contributions</li>
                        </ul>
                        <h6>Examples of Respectful Behavior:</h6>
                        <ul>
                            <li>Using "please" and "thank you" in your messages</li>
                            <li>Acknowledging others' contributions before presenting your own ideas</li>
                            <li>Asking clarifying questions instead of making assumptions</li>
                            <li>Offering constructive feedback rather than criticism</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Constructive Communication Modal -->
        <div class="modal fade" id="communicationModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-comments me-2"></i>Constructive Communication
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Effective Communication Strategies:</h6>
                        <ul>
                            <li>Engage in meaningful discussions that contribute to learning</li>
                            <li>Provide constructive feedback that helps everyone learn and grow</li>
                            <li>Ask thoughtful questions that deepen understanding</li>
                            <li>Share relevant examples and experiences</li>
                            <li>Build upon others' ideas rather than simply agreeing or disagreeing</li>
                        </ul>
                        <h6>Best Practices:</h6>
                        <ul>
                            <li>Be specific in your feedback and suggestions</li>
                            <li>Use "I" statements to express your perspective</li>
                            <li>Focus on ideas, not individuals</li>
                            <li>Encourage participation from all group members</li>
                            <li>Summarize key points to ensure understanding</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Privacy & Safety Modal -->
        <div class="modal fade" id="privacyModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-user-secret me-2"></i>Privacy & Safety
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Personal Information Protection:</h6>
                        <ul>
                            <li>Never share personal information such as addresses, phone numbers, or social media accounts</li>
                            <li>Use strong, unique passwords for all accounts</li>
                            <li>Be cautious when sharing files or documents</li>
                            <li>Report suspicious activities or inappropriate behavior immediately</li>
                        </ul>
                        <h6>Digital Safety Guidelines:</h6>
                        <ul>
                            <li>Keep your login credentials secure and private</li>
                            <li>Be mindful of what you share in public forums</li>
                            <li>Respect others' privacy by not sharing their information</li>
                            <li>Use secure, official platforms for academic work</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Fact-Checking Modal -->
        <div class="modal fade" id="factcheckModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-check-circle me-2"></i>Fact-Checking
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Information Verification:</h6>
                        <ul>
                            <li>Verify information before sharing with reliable sources</li>
                            <li>Cite sources properly using appropriate academic formats</li>
                            <li>Distinguish between facts, opinions, and interpretations</li>
                            <li>Question information that seems too good to be true</li>
                        </ul>
                        <h6>Academic Integrity:</h6>
                        <ul>
                            <li>Give proper credit to original authors and creators</li>
                            <li>Use quotation marks for direct quotes</li>
                            <li>Paraphrase appropriately while maintaining original meaning</li>
                            <li>Maintain your own original thinking and analysis</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Appropriate Language Modal -->
        <div class="modal fade" id="languageModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-language me-2"></i>Appropriate Language
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Professional Communication:</h6>
                        <ul>
                            <li>Use professional and appropriate language that reflects the academic nature of discussions</li>
                            <li>Avoid slang, abbreviations, and informal expressions in academic contexts</li>
                            <li>Write in complete sentences with proper grammar and punctuation</li>
                            <li>Use respectful and inclusive language</li>
                        </ul>
                        <h6>Language Guidelines:</h6>
                        <ul>
                            <li>Be clear and concise in your communication</li>
                            <li>Use appropriate tone for the context</li>
                            <li>Avoid offensive, discriminatory, or inflammatory language</li>
                            <li>Consider your audience when choosing words and phrases</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cultural Sensitivity Modal -->
        <div class="modal fade" id="culturalModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-heart me-2"></i>Cultural Sensitivity
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Cultural Awareness:</h6>
                        <ul>
                            <li>Be mindful of cultural differences and diverse backgrounds</li>
                            <li>Approach discussions about Philippine heritage with sensitivity and respect</li>
                            <li>Use inclusive language that welcomes all perspectives</li>
                            <li>Recognize and value different cultural viewpoints</li>
                        </ul>
                        <h6>Inclusive Practices:</h6>
                        <ul>
                            <li>Promote diversity and inclusion in all discussions</li>
                            <li>Be aware of cultural context when sharing information</li>
                            <li>Respect different cultural practices and traditions</li>
                            <li>Create a welcoming environment for all participants</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">I Understand</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalsHTML);
    
    // Attach Explain buttons to populate detail panel
    const explanations = {
        respect: {
            title: 'Show Respect and Appreciation',
            body: 'Use thoughtful, courteous language. Acknowledge others\' perspectives before sharing your own and avoid personal attacks or sarcasm. Praise publicly; correct privately.'
        },
        topic: {
            title: 'Stay on Topic',
            body: 'Keep discussions focused on Filipino culture, traditional arts, and living treasures. Create new threads for unrelated ideas to keep conversations clear and helpful.'
        },
        think: {
            title: 'Think Before You Post',
            body: 'Verify information, cite sources when possible, and ask clarifying questions. If you make a mistake, edit or follow up with corrections rather than deleting context.'
        },
        language: {
            title: 'Use Proper Language and Tone',
            body: 'Write clearly and politely. Avoid slang and all caps. Read your message aloud to check tone—aim for constructive, kind, and educational communication.'
        },
        privacy: {
            title: 'Protect Privacy',
            body: 'Never post personal data (addresses, numbers, photos without consent). When discussing artists, focus on public work and contributions, not private lives.'
        },
        citizen: {
            title: 'Be a Responsible Digital Citizen',
            body: 'Report harmful content, discourage harassment, and model respectful engagement. Welcome newcomers and guide them to resources about Philippine culture.'
        }
    };

    const detail = document.getElementById('netiquette-detail');
    document.querySelectorAll('.explain-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const key = btn.dataset.key;
            const info = explanations[key];
            if (!detail || !info) return;
            detail.innerHTML = `
                <div class="netiquette-card p-4">
                    <h6 class="fw-bold mb-2">${info.title}</h6>
                    <p class="mb-0">${info.body}</p>
                </div>
            `;
            detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Group Reflections modal functionality
function initReflectionsModal() {
    // Create individual modals for each reflection category
    const reflectionsModalsHTML = `
        <!-- Literary Analysis Modal -->
        <div class="modal fade" id="literaryAnalysisModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-quote-left me-2"></i>Literary Summarized
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <h6 class="text-primary mb-3">Our Group's Comprehensive Analysis</h6>
                                <p class="lead">How GAMABA awardees have influenced Philippine literature and cultural identity through their artistic contributions.</p>
                                
                                <h6>Key Findings:</h6>
                                <ul>
                                    <li><strong>Oral Tradition Preservation:</strong> GAMABA awardees have maintained and revitalized traditional storytelling methods that form the foundation of Philippine literature.</li>
                                    <li><strong>Cultural Identity Formation:</strong> Their works serve as living bridges between ancient Filipino traditions and contemporary literary expression.</li>
                                    <li><strong>Language Diversity:</strong> Many awardees work in indigenous languages, preserving linguistic heritage that enriches Philippine literature.</li>
                                    <li><strong>Narrative Techniques:</strong> Traditional storytelling methods have influenced modern Filipino writers and poets.</li>
                                </ul>

                                <h6>Literary Significance:</h6>
                                <p>The GAMABA awardees represent the living roots of Philippine literature. Their oral traditions, folk narratives, and cultural expressions provide the authentic foundation upon which contemporary Filipino literature builds. Through their work, we see the continuity of literary traditions that span centuries.</p>

                                <h6>Cultural Impact:</h6>
                                <p>These artists have not only preserved traditional forms but have also inspired new generations of Filipino writers to explore their cultural roots. Their influence extends beyond literature into education, where their stories and techniques are used to teach Filipino values and history.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <h6 class="card-title">Featured GAMABA Awardees</h6>
                                        <ul class="list-unstyled small">
                                            <li class="mb-2"><strong>Federico Caballero</strong> - Epic chanter</li>
                                            <li class="mb-2"><strong>Ginaw Bilog</strong> - Poet and artist</li>
                                            <li class="mb-2"><strong>Salinta Monon</strong> - Textile weaver and storyteller</li>
                                            <li class="mb-2"><strong>Lang Dulay</strong> - T'boli weaver and cultural bearer</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Cultural Impact Modal -->
        <div class="modal fade" id="culturalImpactModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-heart me-2"></i>Cultural Impact
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <h6 class="text-primary mb-3">Exploring the Profound Cultural Impact</h6>
                                <p class="lead">How GAMABA artists have influenced contemporary Philippine society and literature through their cultural contributions.</p>
                                
                                <h6>Contemporary Influence:</h6>
                                <ul>
                                    <li><strong>Educational Integration:</strong> GAMABA traditions are now incorporated into school curricula, teaching students about Filipino cultural heritage.</li>
                                    <li><strong>Modern Literature:</strong> Contemporary Filipino writers draw inspiration from GAMABA oral traditions and storytelling techniques.</li>
                                    <li><strong>Cultural Tourism:</strong> GAMABA communities have become centers of cultural tourism, promoting awareness of Filipino traditions.</li>
                                    <li><strong>Digital Preservation:</strong> Traditional knowledge is being digitized and shared through modern platforms.</li>
                                </ul>

                                <h6>Social Transformation:</h6>
                                <p>GAMABA awardees have become cultural ambassadors, bridging the gap between traditional and modern Filipino society. Their recognition has elevated the status of traditional arts and crafts, inspiring pride in Filipino cultural identity.</p>

                                <h6>Literary Evolution:</h6>
                                <p>The influence of GAMABA artists on Philippine literature is evident in the growing appreciation for indigenous narratives, traditional poetic forms, and cultural storytelling. Modern Filipino literature increasingly incorporates elements from these traditional art forms.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <h6 class="card-title">Impact Areas</h6>
                                        <ul class="list-unstyled small">
                                            <li class="mb-2"><i class="fas fa-book text-primary me-2"></i>Literature & Writing</li>
                                            <li class="mb-2"><i class="fas fa-graduation-cap text-primary me-2"></i>Education</li>
                                            <li class="mb-2"><i class="fas fa-users text-primary me-2"></i>Community Development</li>
                                            <li class="mb-2"><i class="fas fa-globe text-primary me-2"></i>Cultural Tourism</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Group Insights Modal -->
        <div class="modal fade" id="groupInsightsModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-users me-2"></i>Group Insights
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <h6 class="text-primary mb-3">Personal Reflections from Our Group Members</h6>
                                <p class="lead">Individual insights on the significance of preserving cultural heritage through literature and the GAMABA tradition.</p>
                                
                                <div class="row">
                                    <div class="col-md-6 mb-4">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h6 class="card-title">Member 1 - Literature Student</h6>
                                                <p class="card-text">"Learning about GAMABA awardees has completely changed my perspective on Philippine literature. I now understand that our literary tradition isn't just about written words, but about the living stories that have been passed down through generations."</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h6 class="card-title">Member 2 - Cultural Studies</h6>
                                                <p class="card-text">"The GAMABA tradition shows us that culture is not static. These artists are not just preserving the past; they're actively creating the future of Filipino cultural expression."</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h6 class="card-title">Member 3 - Education Major</h6>
                                                <p class="card-text">"As future educators, we have a responsibility to ensure that GAMABA traditions are taught in schools. These stories and techniques are essential for developing Filipino cultural identity in young learners."</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6 mb-4">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <h6 class="card-title">Member 4 - Digital Media</h6>
                                                <p class="card-text">"The challenge is how to preserve these traditional forms in our digital age. We need to find ways to make GAMABA traditions accessible and relevant to modern Filipino youth."</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h6>Collective Insights:</h6>
                                <p>As a group, we've realized that GAMABA awardees represent more than just individual artists—they are the guardians of Filipino cultural memory. Their work connects us to our roots while providing a foundation for future cultural expression.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <h6 class="card-title">Key Learnings</h6>
                                        <ul class="list-unstyled small">
                                            <li class="mb-2"><i class="fas fa-lightbulb text-primary me-2"></i>Cultural continuity</li>
                                            <li class="mb-2"><i class="fas fa-heart text-primary me-2"></i>Heritage preservation</li>
                                            <li class="mb-2"><i class="fas fa-book text-primary me-2"></i>Literary tradition</li>
                                            <li class="mb-2"><i class="fas fa-users text-primary me-2"></i>Community responsibility</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Literary Significance Modal -->
        <div class="modal fade" id="literarySignificanceModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="fas fa-star me-2"></i>Literary Significance
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-8">
                                <h6 class="text-primary mb-3">In-Depth Examination of Literary Impact</h6>
                                <p class="lead">How GAMABA awardees have shaped the landscape of Philippine literary tradition and influenced contemporary Filipino literature.</p>
                                
                                <h6>Literary Contributions:</h6>
                                <ul>
                                    <li><strong>Oral Literature Preservation:</strong> GAMABA awardees maintain epic traditions, folk narratives, and oral poetry that form the foundation of Philippine literature.</li>
                                    <li><strong>Narrative Techniques:</strong> Traditional storytelling methods have influenced modern Filipino writers, providing authentic narrative structures and cultural contexts.</li>
                                    <li><strong>Language Preservation:</strong> Many awardees work in indigenous languages, preserving linguistic diversity that enriches Philippine literature.</li>
                                    <li><strong>Cultural Authenticity:</strong> Their work provides authentic cultural references and contexts for contemporary Filipino literature.</li>
                                </ul>

                                <h6>Contemporary Influence:</h6>
                                <p>Modern Filipino literature increasingly draws from GAMABA traditions, incorporating traditional themes, narrative structures, and cultural elements. This influence is evident in contemporary poetry, fiction, and drama that seeks to connect with Filipino cultural roots.</p>

                                <h6>Educational Impact:</h6>
                                <p>GAMABA traditions are now integrated into literature curricula, providing students with authentic examples of Filipino literary heritage. This integration helps develop cultural literacy and appreciation for traditional forms of expression.</p>

                                <h6>Future Directions:</h6>
                                <p>The continued influence of GAMABA awardees on Philippine literature suggests a growing appreciation for traditional forms and their relevance to contemporary literary expression. This trend points toward a more culturally grounded and authentic Filipino literature.</p>
                            </div>
                            <div class="col-lg-4">
                                <div class="card bg-light">
                                    <div class="card-body">
                                        <h6 class="card-title">Literary Elements</h6>
                                        <ul class="list-unstyled small">
                                            <li class="mb-2"><i class="fas fa-microphone text-primary me-2"></i>Oral Traditions</li>
                                            <li class="mb-2"><i class="fas fa-language text-primary me-2"></i>Indigenous Languages</li>
                                            <li class="mb-2"><i class="fas fa-book-open text-primary me-2"></i>Narrative Structures</li>
                                            <li class="mb-2"><i class="fas fa-palette text-primary me-2"></i>Cultural Themes</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', reflectionsModalsHTML);
    
    // Add click handlers to reflection cards
    const reflectionCards = document.querySelectorAll('#reflections .card');
    const reflectionModalIds = ['literaryAnalysisModal', 'culturalImpactModal', 'groupInsightsModal', 'literarySignificanceModal'];
    
    reflectionCards.forEach((card, index) => {
        const readMoreBtn = card.querySelector('.btn-outline-primary');
        if (readMoreBtn) {
            readMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const modal = new bootstrap.Modal(document.getElementById(reflectionModalIds[index]));
                modal.show();
            });
        }
    });
}

// Utility functions
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Form validation (if forms are added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

// Lazy loading for images (if added later)
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Back to top button
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'btn btn-primary position-fixed';
    backToTopButton.style.cssText = `
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
initBackToTop();

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);
