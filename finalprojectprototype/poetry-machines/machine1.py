import json
import random

# --- Your actual poetry machine logic goes here ---
seasons = ['spring',
'winter',
'summer',
'autumn']

timeofday = ['morning',
'midday',
'afternoon',
'evening',
'midnight']

locations = [
    'on Jay Street',
    'on a quiet block in Brooklyn',
    'along the Hudson River',
    'under the Manhattan Bridge',
    'outside a laundromat in Flushing',
    'in a basement in Chinatown',
    'on a rooftop in Bushwick',
    'by the piers in Red Hook',
    'inside a cafe in the East Village',
    'on the downtown F train',
    'between two subway stops',
    'on the last ferry to Staten Island',
    'in the back seat of a yellow cab',
    'crossing the Williamsburg Bridge',
    'standing at a crowded bus stop',
    'on a platform that smells like rain',
    'in a kitchen with no windows',
    'inside a narrow bookstore',
    'in a hallway full of echoes',
    'at a table near the door',
    'on the floor of a shared apartment',
    'in a room lit only by a desk lamp',
    'in a studio facing brick walls'
]

numbers = [
    'two',
    'three',
    'four'
]

people = [
    'women',
    'men',
    'boys',
    'girls',
    'people'
]

descriptions = [
    'with green eyes',
    'with blue eyes',
    'with brown eyes',
    'with blond hair',
    'with green hair',
    'with brown hair',
    'with red hair',
    'with blue hair',
    'with pink hair',
    'wearing large hats',
    'wearing pink furry coats',
    'carrying luggage',
    'wearing orange scarves',
    'holding yellow umbrellas',
    'wearing white sneakers',
    'all suited up'
]

actions = [
    'talking about',
    'singing about',
    'arguing about',
    'painting images about',
    'telling stories about',
    'filming moments about',
    'collecting objects about',
    'recording sounds about',
    'laughing about',
    'fighting about',
    'caring about',
    'worrying about',
    'waiting for',
    'hoping for',
    'missing someone in',
    'forgiving someone for',
    'thinking of',
    'looking at',
    'listening to stories about',
    'writing about',
    'whispering about',
    'shouting about',
    'confessing about',
    'complaining about',
    'joking about',
    'dreaming aloud about',
    'lecturing about',
    'reflecting about',
    'gossiping about',
    'praying about',
    'wondering about'
]

states = [
    'came back',
    'left',
    'woke up',
    'died',
    'smiled',
    'cried',
    'lived',
    'slept',
    'called again',
    'wrote back',
    'finished the story',
    'found the way home',
    'opened the letter',
    'turned around',
    'looked up',
    'said goodbye',
    'missed the train',
    'caught the train',
    'lost the map',
    'followed the signs',
    'closed the door',
    'learned the song',
    'forgot the tune',
    'solved the puzzle',
    'broke the silence',
    'lit the candle',
    'put out the fire',
    'chased the pigeons',
    'fed the cats',
    'watered the plants',
    'watched the sunset',
    'counted the stars',
    'made a wish',
    'told the truth',
    'told a lie',
    'asked why',
    'knew what happened'
]

def article(word):
    if word[0].lower() in "aeiou":
        return "An"
    return "A"

shuffled_seasons = seasons[:] 
random.shuffle(shuffled_seasons)

def generate_poem_lines():
    lines = []
    
    for season in shuffled_seasons:
        lines.append("")  # blank line between stanzas
        lines.append(article(season) + " " + season + " " + random.choice(timeofday))
        lines.append(random.choice(locations))
        lines.append(random.choice(numbers) + " " + random.choice(people) + " " + random.choice(descriptions))
        lines.append(random.choice(actions) + " someone who never " + random.choice(states))
    
    poem_text = "\n".join(lines).strip()  # .strip() removes leading blank line
    
    print(json.dumps({
        "text": poem_text,
        "lines": poem_text.split("\n")
    }))

    # at the bottom of the file
if __name__ == "__main__":
    generate_poem_lines()