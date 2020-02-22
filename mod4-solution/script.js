(function () {
  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
  for (var name of names) {
    var firstLetter = name.charAt(0);
    if (firstLetter.toLowerCase() === 'j') {
      byeSpeaker.speak(name);
    } else {
      helloSpeaker.speak(name);
    }
  }

  console.log("*----------- Part 1 finished -----------*");

  function speakSimple(name) {
    var firstLetter = name.charAt(0);
    if (firstLetter.toLowerCase() === 'j') {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }

  var mappedNames = names.map(speakSimple);
  for (mappedName of mappedNames) {
    console.log(mappedName);
  }

  console.log("*----------- Part 2 finished -----------*");

  function createPhrases(phrases, name) {
    var firstLetter = name.charAt(0);
    if (firstLetter.toLowerCase() === 'j') {
      phrases["bye"].push(byeSpeaker.speakSimple(name));
    } else {
      phrases["hello"].push(helloSpeaker.speakSimple(name));
    }
    return phrases;
  }

  var phrases = names.reduce(createPhrases, {hello: [], bye: []});
  for (hello of phrases["hello"]) {
    console.log(hello);
  }
  for (bye of phrases["bye"]) {
    console.log(bye);
  }

  console.log("*----------- Part 3 finished -----------*");
})();
