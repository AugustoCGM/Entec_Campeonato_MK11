document.addEventListener('DOMContentLoaded', () => {
    
    // =========================================
    // 1. DADOS DOS PERSONAGENS (ROSTER DO HERO)
    // =========================================
    const roster = [
        { id: 'char1', name: 'Scorpion', avatar: 'assets/avatar-1.png', full: 'assets/full-1.png' },
        { id: 'char2', name: 'Johnny', avatar: 'assets/avatar-2.png', full: 'assets/full-2.png' }, 
        { id: 'char3', name: 'Sonya', avatar: 'assets/avatar-3.png', full: 'assets/full-3.png' },
        { id: 'char4', name: 'Cassie', avatar: 'assets/avatar-4.png', full: 'assets/full-4.png' },
        { id: 'char5', name: 'Jax', avatar: 'assets/avatar-5.png', full: 'assets/full-5.png' },
        { id: 'char6', name: 'Sub-Zero', avatar: 'assets/avatar-6.png', full: 'assets/full-6.png' }
    ];

    const rosterGrid = document.getElementById('roster-grid');
    const p1Img = document.getElementById('p1-img');
    const p2Img = document.getElementById('p2-img');
    const p1NameText = document.getElementById('p1-name');
    const p2NameText = document.getElementById('p2-name');

    let p1Index = 0; 
    let p2Index = 5; 

    // =========================================
    // 2. SISTEMA DE ÁUDIO E VISIBILIDADE DO HERO
    // =========================================
    const tickSound = new Audio('assets/select.mp3');
    tickSound.volume = 0.4;

    let isHeroVisible = true;
    const heroSection = document.getElementById('hero-section');

    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isHeroVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });
        heroObserver.observe(heroSection);
    }

    function playTickSound() {
        if (isHeroVisible) {
            const soundClone = tickSound.cloneNode();
            soundClone.volume = 0.4;
            soundClone.play().catch(() => { console.log("Áudio bloqueado pelo navegador."); });
        }
    }

    function buildRosterRow() {
        roster.forEach((char, index) => {
            const slot = document.createElement('div');
            slot.classList.add('roster-slot');
            slot.id = `slot-${index}`;
            
            const img = document.createElement('img');
            img.classList.add('avatar-img');
            img.src = char.avatar;
            img.alt = char.name;
            img.onerror = () => { img.style.display = 'none'; };
            
            const iconP1 = document.createElement('img');
            iconP1.classList.add('marker-icon', 'marker-p1');
            iconP1.src = 'assets/marker-p1.png';
            iconP1.alt = 'P1';
            iconP1.onerror = () => { iconP1.style.display = 'none'; };

            const iconP2 = document.createElement('img');
            iconP2.classList.add('marker-icon', 'marker-p2');
            iconP2.src = 'assets/marker-p2.png';
            iconP2.alt = 'P2';
            iconP2.onerror = () => { iconP2.style.display = 'none'; };

            slot.appendChild(img);
            slot.appendChild(iconP1);
            slot.appendChild(iconP2);
            rosterGrid.appendChild(slot);
        });

        document.getElementById(`slot-${p1Index}`).classList.add('p1-active');
        document.getElementById(`slot-${p2Index}`).classList.add('p2-active');
        p1Img.src = roster[p1Index].full;
        p2Img.src = roster[p2Index].full;
        p1NameText.innerText = roster[p1Index].name;
        p2NameText.innerText = roster[p2Index].name;
    }

    function animateSelection(playerClass, startIdx, targetIdx, callback) {
        let currentIdx = startIdx;
        let direction = targetIdx > startIdx ? 1 : -1;
        
        if (currentIdx === targetIdx) {
            if (callback) callback();
            return;
        }

        let jumpInterval = setInterval(() => {
            const oldSlot = document.getElementById(`slot-${currentIdx}`);
            if (oldSlot) oldSlot.classList.remove(`${playerClass}-active`);
            
            currentIdx += direction;
            playTickSound();
            
            const newSlot = document.getElementById(`slot-${currentIdx}`);
            if (newSlot) newSlot.classList.add(`${playerClass}-active`);

            if (currentIdx === targetIdx) {
                clearInterval(jumpInterval);
                if (callback) callback();
            }
        }, 150); 
    }

    function changeP1() {
        let newP1;
        do {
            newP1 = Math.floor(Math.random() * roster.length);
        } while (newP1 === p1Index || newP1 === p2Index); 
        
        let oldIndex = p1Index;
        p1Index = newP1; 
        
        animateSelection('p1', oldIndex, newP1, () => {
            p1Img.style.opacity = '0';
            p1NameText.style.opacity = '0';
            setTimeout(() => {
                p1Img.src = roster[newP1].full;
                p1NameText.innerText = roster[newP1].name;
                p1Img.style.opacity = '1';
                p1NameText.style.opacity = '1';
            }, 300);
        });
    }

    function changeP2() {
        let newP2;
        do {
            newP2 = Math.floor(Math.random() * roster.length);
        } while (newP2 === p2Index || newP2 === p1Index);
        
        let oldIndex = p2Index;
        p2Index = newP2;
        
        animateSelection('p2', oldIndex, newP2, () => {
            p2Img.style.opacity = '0';
            p2NameText.style.opacity = '0';
            setTimeout(() => {
                p2Img.src = roster[newP2].full;
                p2NameText.innerText = roster[newP2].name;
                p2Img.style.opacity = '1';
                p2NameText.style.opacity = '1';
            }, 300);
        });
    }

    if (rosterGrid) {
        buildRosterRow();
        setInterval(changeP1, 6000);
        setTimeout(() => {
            setInterval(changeP2, 6000);
        }, 3000);
    }

    // =========================================
    // 3. SCROLL DO HEADER E ANIMAÇÃO DE CARDS
    // =========================================
    const headerBtn = document.getElementById('btn-header-inscricao');

    window.addEventListener('scroll', () => {
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (window.scrollY > (heroHeight * 0.6)) {
                headerBtn.classList.add('show');
            } else {
                headerBtn.classList.remove('show');
            }
        }
    });

    const cards = document.querySelectorAll('.card, .box');
    cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 150 * index);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => observer.observe(card));

    // =========================================
    // 4. LÓGICA DO CHAVEAMENTO E FUNDOS DE ARENA
    // =========================================
    const arenaBgs = [
        'url("assets/arena-1.jpg")',
        'url("assets/arena-2.jpg")',
        'url("assets/arena-3.jpg")',
        'url("assets/arena-4.jpg")',
        'url("assets/arena-5.jpg")',
        'url("assets/arena-6.jpg")',
        'url("assets/arena-7.jpg")',
        'url("assets/arena-8.jpg")',
        'url("assets/arena-9.jpg")',
        'url("assets/arena-10.jpg")'
    ];
    
    const masterPool = [
        { name: 'Scorpion', icon: 'assets/bracket-icon-1.png', full: 'assets/battle-render-1.png' },
        { name: 'Johnny Cage', icon: 'assets/bracket-icon-2.png', full: 'assets/battle-render-2.png' },
        { name: 'Sonya Blade', icon: 'assets/bracket-icon-3.png', full: 'assets/battle-render-3.png' },
        { name: 'Cassie Cage', icon: 'assets/bracket-icon-4.png', full: 'assets/battle-render-4.png' },
        { name: 'Jax Briggs', icon: 'assets/bracket-icon-5.png', full: 'assets/battle-render-5.png' },
        { name: 'Sub-Zero', icon: 'assets/bracket-icon-6.png', full: 'assets/battle-render-6.png' },
        { name: 'Raiden', icon: 'assets/bracket-icon-7.png', full: 'assets/battle-render-7.png' }, 
        { name: 'Liu Kang', icon: 'assets/bracket-icon-8.png', full: 'assets/battle-render-8.png' },
        { name: 'Kung Lao', icon: 'assets/bracket-icon-9.png', full: 'assets/battle-render-9.png' },
        { name: 'Kitana', icon: 'assets/bracket-icon-10.png', full: 'assets/battle-render-10.png' },
        { name: 'Jade', icon: 'assets/bracket-icon-11.png', full: 'assets/battle-render-11.png' },
        { name: 'Scarlet', icon: 'assets/bracket-icon-12.png', full: 'assets/battle-render-12.png' },
        { name: 'Baraka', icon: 'assets/bracket-icon-13.png', full: 'assets/battle-render-13.png' },
        { name: 'Kabal', icon: 'assets/bracket-icon-14.png', full: 'assets/battle-render-14.png' },
        { name: 'Erron Black', icon: 'assets/bracket-icon-15.png', full: 'assets/battle-render-15.png' },
        { name: 'Noob Saibot', icon: 'assets/bracket-icon-16.png', full: 'assets/battle-render-16.png' }
    ];

    function generateRandomTeams() {
        let shuffled = [...masterPool].sort(() => 0.5 - Math.random());
        let teams = [];
        for (let i = 0; i < 8; i++) {
            teams.push({ id: i + 1, fighters: [shuffled[i * 2], shuffled[i * 2 + 1]] });
        }
        return teams;
    }

    const uiLeft = document.getElementById('showcase-left');
    const uiRight = document.getElementById('showcase-right');
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    function renderTeamBox(boxId, team) {
        const box = document.getElementById(boxId);
        if (!box) return;
        const f1Img = box.querySelector('.f1 img');
        const f2Img = box.querySelector('.f2 img');

        if (team) {
            f1Img.src = team.fighters[0].icon;
            f2Img.src = team.fighters[1].icon;
            box.style.opacity = '1';
        } else {
            f1Img.src = '';
            f2Img.src = '';
            box.style.opacity = '0.35';
        }
    }

    async function runTournament() {
        const roundLabel = document.getElementById('round-label');
        const teams = generateRandomTeams();

        document.querySelectorAll('.lit').forEach(el => el.classList.remove('lit'));
        document.querySelectorAll('.winner-box').forEach(el => el.classList.remove('winner-box'));
        document.querySelectorAll('.eliminated').forEach(el => el.classList.remove('eliminated'));

        for (let i = 0; i < 8; i++) {
            renderTeamBox(`box-q${i + 1}`, teams[i]);
        }

        await sleep(1500);

        let quarterWinners = [];
        let semiWinners = [];

        const bracketRounds = [
            { t1: teams[0], t2: teams[1], b1: 'box-q1', b2: 'box-q2', p1: 'path-q1', p2: 'path-q2', pUp: 'path-s1-up', round: 'QUARTAS DE FINAL' },
            { t1: teams[2], t2: teams[3], b1: 'box-q3', b2: 'box-q4', p1: 'path-q3', p2: 'path-q4', pUp: 'path-s2-up', round: 'QUARTAS DE FINAL' },
            { t1: teams[4], t2: teams[5], b1: 'box-q5', b2: 'box-q6', p1: 'path-q5', p2: 'path-q6', pUp: 'path-s3-up', round: 'QUARTAS DE FINAL' },
            { t1: teams[6], t2: teams[7], b1: 'box-q7', b2: 'box-q8', p1: 'path-q7', p2: 'path-q8', pUp: 'path-s4-up', round: 'QUARTAS DE FINAL' },
            
            { getPair: () => [quarterWinners[0], quarterWinners[1]], b1: 'box-s1', b2: 'box-s2', p1: 'path-s1', p2: 'path-s2', pUp: 'path-f1-up', round: 'SEMIFINAIS' },
            { getPair: () => [quarterWinners[2], quarterWinners[3]], b1: 'box-s3', b2: 'box-s4', p1: 'path-s3', p2: 'path-s4', pUp: 'path-f2-up', round: 'SEMIFINAIS' },
            
            { getPair: () => [semiWinners[0], semiWinners[1]], b1: 'box-f1', b2: 'box-f2', p1: 'path-f1', p2: 'path-f2', pUp: 'path-champ', round: 'GRANDE FINAL' }
        ];

        for (let i = 0; i < bracketRounds.length; i++) {
            let match = bracketRounds[i];
            roundLabel.innerText = match.round;

            let t1, t2;
            if (i < 4) {
                t1 = match.t1;
                t2 = match.t2;
            } else {
                let pair = match.getPair();
                t1 = pair[0];
                t2 = pair[1];
            }

            document.querySelectorAll('.bracket-box').forEach(b => b.classList.remove('active-match'));
            let box1 = document.getElementById(match.b1);
            let box2 = document.getElementById(match.b2);
            if (box1) box1.classList.add('active-match');
            if (box2) box2.classList.add('active-match');

            // Aplica os fundos de arena em cada caixa lateral
            const leftTop = uiLeft.querySelector('.top-box');
            const leftBottom = uiLeft.querySelector('.bottom-box');
            const rightTop = uiRight.querySelector('.top-box');
            const rightBottom = uiRight.querySelector('.bottom-box');

            if (leftTop && leftBottom && rightTop && rightBottom) {
                // Sorteia uma arena para a dupla 1 (Topo)
                let bgIndex1 = Math.floor(Math.random() * arenaBgs.length);
                
                // Sorteia uma arena DIFERENTE para a dupla 2 (Fundo)
                let bgIndex2;
                do {
                    bgIndex2 = Math.floor(Math.random() * arenaBgs.length);
                } while (bgIndex2 === bgIndex1);

                const bgP1 = arenaBgs[bgIndex1];
                const bgP2 = arenaBgs[bgIndex2];

                // Os Jogadores 1 (Equipe Esquerda e Direita) lutam na mesma arena
                leftTop.style.backgroundImage = bgP1;
                rightTop.style.backgroundImage = bgP1;

                // Os Jogadores 2 (Equipe Esquerda e Direita) lutam na segunda arena
                leftBottom.style.backgroundImage = bgP2;
                rightBottom.style.backgroundImage = bgP2;
            }

            uiLeft.className = "team-showcase left-showcase active";
            uiRight.className = "team-showcase right-showcase active";
            uiLeft.querySelector('.char1').src = t1.fighters[0].full;
            uiLeft.querySelector('.char2').src = t1.fighters[1].full;
            uiRight.querySelector('.char1').src = t2.fighters[0].full;
            uiRight.querySelector('.char2').src = t2.fighters[1].full;

            await sleep(2000);

            let t1Wins = Math.random() > 0.5;
            let winner = t1Wins ? t1 : t2;
            let loserBox = t1Wins ? box2 : box1;
            let winnerBox = t1Wins ? box1 : box2;

            if (t1Wins) {
                uiLeft.classList.add('winner');
                uiRight.classList.add('loser');
                document.getElementById(match.p1).classList.add('lit');
            } else {
                uiRight.classList.add('winner');
                uiLeft.classList.add('loser');
                document.getElementById(match.p2).classList.add('lit');
            }
            document.getElementById(match.pUp).classList.add('lit');

            if (loserBox) {
                loserBox.classList.remove('active-match');
                loserBox.classList.add('eliminated');
            }
            if (winnerBox) {
                winnerBox.classList.remove('active-match');
                winnerBox.classList.add('winner-box');
            }

            await sleep(2000);

            if (i < 4) {
                quarterWinners.push(winner);
                if (i === 1) { 
                    renderTeamBox('box-s1', quarterWinners[0]); 
                    renderTeamBox('box-s2', quarterWinners[1]); 
                }
                if (i === 3) { 
                    renderTeamBox('box-s3', quarterWinners[2]); 
                    renderTeamBox('box-s4', quarterWinners[3]); 
                }
            } else if (i < 6) {
                semiWinners.push(winner);
                if (i === 5) { 
                    renderTeamBox('box-f1', semiWinners[0]); 
                    renderTeamBox('box-f2', semiWinners[1]); 
                }
            } else {
                const champBox = document.getElementById('champ-box');
                champBox.querySelector('.f1 img').src = winner.fighters[0].icon;
                champBox.querySelector('.f2 img').src = winner.fighters[1].icon;
                champBox.classList.add('active');
                roundLabel.innerText = "CAMPEÕES DA ARENA";

                if (t1Wins) {
                    uiLeft.className = "team-showcase left-showcase active winner";
                    uiRight.className = "team-showcase right-showcase active loser";
                } else {
                    uiLeft.className = "team-showcase left-showcase active loser";
                    uiRight.className = "team-showcase right-showcase active winner";
                }
                return;
            }

            uiLeft.classList.remove('active', 'winner', 'loser');
            uiRight.classList.remove('active', 'winner', 'loser');
            await sleep(600);
        }
    }

    const bracketObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            runTournament();
            bracketObserver.disconnect();
        }
    }, { threshold: 0.3 });

    const chaveamentoSection = document.getElementById('chaveamento');
    if (chaveamentoSection) {
        bracketObserver.observe(chaveamentoSection);
    }
});