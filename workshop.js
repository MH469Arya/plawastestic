document.addEventListener('DOMContentLoaded', () => {
    const stages = document.querySelectorAll('.stage');
    const nextButtons = document.querySelectorAll('.next-stage-btn');
    const restartButton = document.querySelector('.restart-btn');
    const progressSteps = document.querySelectorAll('.progress-bar .step');
    const progressFill = document.querySelector('.progress-fill');
    const infoText = document.getElementById('info-text');

    let currentStage = 0;
    const totalStages = stages.length;

    const infoMessages = [
        "Drag the plastic items into the collection bin to start the recycling process!",
        "The collected waste is now sorted by plastic type and thoroughly cleaned to remove contaminants.",
        "The clean plastic is shredded into small flakes and then melted down into a malleable form.",
        "The molten plastic is molded into new, useful products, completing the recycling loop!"
    ];

    function updateStage(newStageIndex) {
        // Mark previous step as completed
        if (currentStage < newStageIndex && progressSteps[currentStage]) {
            progressSteps[currentStage].classList.add('completed');
        }

        // Hide current stage
        stages[currentStage].classList.remove('active');
        progressSteps[currentStage].classList.remove('active');

        // Show new stage
        currentStage = newStageIndex;
        stages[currentStage].classList.add('active');
        progressSteps[currentStage].classList.add('active');

        // Update progress bar
        const progressPercentage = (currentStage / (totalStages - 1)) * 100;
        progressFill.style.width = `${progressPercentage}%`;

        // Update info panel
        infoText.textContent = infoMessages[currentStage];
    }

    nextButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (currentStage < totalStages - 1) {
                updateStage(currentStage + 1);
            }
        });
    });

    restartButton.addEventListener('click', () => {
        // This is a simple way to restart; a more robust solution might reset item visibility.
        window.location.reload();
    });

    // --- Drag and Drop Logic for Stage 1 ---
    const plasticItems = document.querySelectorAll('.plastic-item');
    const collectionBin = document.querySelector('.collection-bin');
    const stage1NextBtn = document.querySelector('#stage-1 .next-stage-btn');
    let collectedItems = 0;

    plasticItems.forEach(item => {
        item.addEventListener('dragstart', () => {
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    collectionBin.addEventListener('dragover', e => {
        e.preventDefault(); // Necessary to allow drop
        collectionBin.classList.add('hover');
    });

    collectionBin.addEventListener('dragleave', () => {
        collectionBin.classList.remove('hover');
    });

    collectionBin.addEventListener('drop', e => {
        e.preventDefault();
        const draggedItem = document.querySelector('.dragging');
        if (draggedItem && !draggedItem.classList.contains('collected')) {
            draggedItem.classList.add('collected'); // Mark as collected
            
            // Wait for the CSS fade-out animation to complete before hiding the element
            setTimeout(() => {
                draggedItem.style.display = 'none';
            }, 500); // This duration should match the transition in workshop.css

            collectedItems++;
            collectionBin.classList.remove('hover');

            if (collectedItems === plasticItems.length) {
                collectionBin.querySelector('span').textContent = 'All items collected!';
                stage1NextBtn.disabled = false;
            }
        }
    });
});
