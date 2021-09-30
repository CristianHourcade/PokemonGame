class Game {
    constructor() {
        this.ownPokemon = null;
        this.IAPokemon = null;
        this.turn = null;
        this.playerTurn = Math.round(Math.random());
        this.ammountSkillsToPokemon = 4;

        // Todo: Save these attacks in some data base
        this.skillsInGame = [
            new Skill(1, 'Ataque Normal', 10, 0),
            new Skill(2, 'Mud Slap', 30, 3),
            new Skill(3, 'Tecno Shock', 40, 5),
            new Skill(4, 'Hidrocañón', 20, 1),
            new Skill(5, 'Vendetta', 50, 10),
            new Skill(6, 'Confusion', 25, 2)
        ]
    }

    setRandomSkillsToPokemons() {
        let skills = [];
        Array(10).fill(true).map(() => {
            const indexSkill = Math.floor(Math.random() * (6 - 1) + 1)
            if (skills.findIndex(skill => skill.id == indexSkill) == -1) {
                this.skillsInGame.find(skill => skill.id == indexSkill);
                skills.push(this.skillsInGame.find(skill => skill.id === indexSkill))
            }
        });

        return skills;
    }

    startGame(ownPokemon, IAPokemon) {
        this.turn = 0;

        // Todo: seleccionar quien empieza con los turnos
        this.ownPokemon = ownPokemon;
        this.IAPokemon = IAPokemon;

        this.configUIAttack();

    }

    configUIAttack() {
        // Create UI to attack
        let acumulador = ``;
        this.ownPokemon.skills.forEach((skill) => {
            acumulador += `<button data-idskill="${skill.id}" class="btn-attack-against-ia">${skill.name}
            <br>
            <small>
            <i class="fas fa-fist-raised"></i> Damage: ${skill.damage}
            <br>
            <i class="fas fa-battery-three-quarters"></i>
            Cooldown: ${skill.cooldown} turns
            </small>
            </button>`
        })
        document.getElementById("skills-attack").innerHTML = acumulador;

        Array.from(document.getElementsByClassName("btn-attack-against-ia")).forEach(element => {
            element.onclick = (event) => {
                const idSkills = event.target.getAttribute("data-idskill");
                this.pokemonAttack(idSkills, this.IAPokemon, this.ownPokemon)
            }
        })
    }

    pokemonAttack(idSkill, targetPokemon, fromPokemon) {
        const skill = fromPokemon.skills.find(skill => skill.id == idSkill);
        targetPokemon.life -= skill.damage;
        this.calculateLifeHud();
        this.showAttackUI(skill);
    }

    calculateLifeHud() {
        const ownUI = document.getElementById("own-bar-life");
        const iaUI = document.getElementById("ia-bar-life");

        if (this.IAPokemon.life <= 0) {
            this.IAPokemon.life = 0
            iaUI.innerHTML = "You're dead!"
            iaUI.style.color = 'red'
        } else {
            iaUI.innerHTML = this.IAPokemon.life + " hp"
        }

        if (this.ownPokemon.life <= 0) {
            this.ownPokemon.life = 0
            iaUI.innerHTML = "You're dead!"
        } else {
            ownUI.innerHTML = this.ownPokemon.life + " hp"
        }
        ownUI.style.width = `${this.ownPokemon.life}%`;
        iaUI.style.width = `${this.IAPokemon.life}%`;
    }

    showAttackUI(skill){
        document.getElementById("info").innerHTML = `Pikachu atacó con ${skill.name}`
    }
}